# Kadu Tech — Cardápio React

Projeto Vite + React adaptado a partir do HTML original. O visual e os conteúdos do cardápio foram preservados; os links `data-svc` são configurados pelo React para abrir uma conversa no WhatsApp com a mensagem pré-preenchida.

## Requisitos
- Node.js LTS
- npm

## Executar localmente

```bash
npm install
npm run dev
```

Abra o endereço local informado pelo Vite no terminal.

## Validar a build de produção

```bash
npm run build
npm run preview
```

A saída de produção é criada em `dist/`.

## Publicar na Vercel

### Opção 1 — GitHub (recomendado)
1. Extraia o ZIP e envie a pasta do projeto para um repositório GitHub.
2. Entre na Vercel e escolha **Add New → Project**.
3. Importe o repositório.
4. A Vercel detecta Vite automaticamente. Confira:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Clique em **Deploy**.

### Opção 2 — CLI da Vercel
Instale a CLI e faça login:

```bash
npm install -g vercel
vercel
```

Para publicar em produção:

```bash
vercel --prod
```

O arquivo `vercel.json` inclui uma regra de rewrite para que as rotas da aplicação retornem ao `index.html`.

## Personalizar o WhatsApp
O número está em `src/App.jsx`, na variável `whatsappNumber`, no formato internacional sem `+` nem espaços: `5592988239348`.

## Observação
O arquivo `src/cardapio.html` é o HTML original usado como modelo. Para alterar textos e serviços, edite esse arquivo e mantenha os atributos `data-svc` nos botões de WhatsApp.
