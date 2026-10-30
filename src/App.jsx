import { useEffect, useState } from "react";
import originalHtml from "./cardapio.html?raw";

/**
 * Preserva o HTML/CSS original do cardápio e o monta dentro do ciclo de vida
 * do React. Os links de WhatsApp são configurados após a montagem.
 */
export default function App() {
  const [markup, setMarkup] = useState("");

  useEffect(() => {
    const documentFromTemplate = new DOMParser().parseFromString(originalHtml, "text/html");
    const originalStyles = documentFromTemplate.querySelector("style")?.textContent ?? "";
    const styleElement = document.createElement("style");
    styleElement.id = "kadu-original-styles";
    styleElement.textContent = originalStyles;
    document.head.appendChild(styleElement);

    documentFromTemplate.querySelectorAll("script").forEach((script) => script.remove());
    setMarkup(documentFromTemplate.body.innerHTML);

    return () => styleElement.remove();
  }, []);

  useEffect(() => {
    if (!markup) return;

    const whatsappNumber = "5592988239348";
    document.querySelectorAll("#cardapio [data-svc]").forEach((element) => {
      const service = element.getAttribute("data-svc") || "um atendimento (vi o cardápio)";
      const message = `Olá, Kadu! Vi o cardápio e quero saber sobre: ${service}`;
      element.setAttribute("href", `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    });
  }, [markup]);

  return (
    <main id="cardapio" dangerouslySetInnerHTML={{ __html: markup }} />
  );
}
