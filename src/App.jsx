import { useEffect, useState } from "react";
import originalHtml from "./cardapio.html?raw";

const contacts = {
  carlos: { number: "5592988239348", name: "Carlos Eduardo" },
  eugenio: { number: "5592986336512", name: "Eugênio" },
};

export default function App() {
  const [markup, setMarkup] = useState("");
  const [selectedContact, setSelectedContact] = useState("carlos");

  useEffect(() => {
    const template = new DOMParser().parseFromString(originalHtml, "text/html");

    const style = document.createElement("style");
    style.id = "catalog-original-styles";

    style.textContent = [...template.querySelectorAll("style")]
      .map((node) => node.textContent)
      .join("\n");

    document.head.appendChild(style);

    // O comportamento do script original foi reimplementado com React.
    template.querySelectorAll("script").forEach((node) => node.remove());

    setMarkup(template.body.innerHTML);

    return () => style.remove();
  }, []);

  useEffect(() => {
    if (!markup) return;

    const contact = contacts[selectedContact] ?? contacts.carlos;

    // Atualiza os links individuais dos serviços.
    document.querySelectorAll("#cardapio [data-svc]").forEach((element) => {
      const service = element.getAttribute("data-svc") || "um serviço";

      const message = `Olá, ${contact.name}! Vi o catálogo de serviços e gostaria de saber sobre: ${service}`;

      element.setAttribute(
        "href",
        `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`
      );

      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    });

    // Atualiza a seleção visual do contato.
    document.querySelectorAll("#cardapio [data-person]").forEach((element) => {
      const isSelected =
        element.getAttribute("data-person") === selectedContact;

      element.classList.toggle("sel", isSelected);
    });

    // Atualiza os botões gerais de contato.
    document.querySelectorAll("#cardapio a[href*='wa.me']").forEach((element) => {
      if (element.hasAttribute("data-svc")) return;

      const message = `Olá, ${contact.name}! Vi o catálogo de serviços e gostaria de um orçamento.`;

      element.setAttribute(
        "href",
        `https://wa.me/${contact.number}?text=${encodeURIComponent(message)}`
      );
    });
  }, [markup, selectedContact]);

  useEffect(() => {
    if (!markup) return;

    const handleClick = (event) => {
      const person = event.target.closest("#cardapio [data-person]");

      if (person) {
        event.preventDefault();

        const key = person.getAttribute("data-person");

        if (contacts[key]) {
          setSelectedContact(key);
        }
      }
    };

    const handleScroll = () => {
      const fab = document.querySelector("#cardapio .fab");

      if (!fab) return;

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 140;

      fab.classList.toggle("show", window.scrollY > 620 && !atBottom);
    };

    document.addEventListener("click", handleClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      document.removeEventListener("click", handleClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [markup]);

  return (
    <main
      id="cardapio"
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}