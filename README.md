# Casa & Alma — site (one-page)

Site estático (HTML + CSS + JavaScript puro, **sem frameworks e sem build**).
Pronto a publicar na Netlify arrastando a pasta.

---

## 📁 Estrutura

```
.
├── index.html        → página principal
├── edredons.html     → página do produto Edredons (cores + WhatsApp)
├── tapetes.html      → página do produto Tapetes (cores + WhatsApp)
├── mantas.html       → página do produto Mantas (cores + WhatsApp)
├── style.css         → aspeto (cores, tipografia, layout)
├── script.js         → contactos (CONFIG) + interações
├── README.md         → este guia
└── assets/
    ├── logo-casa-alma.png      → ícone da marca (usado no site)
    ├── logo-casa-alma-full.png → logótipo completo (ícone + nome)
    ├── favicon.svg             → ícone do separador (casa)
    ├── apple-touch-icon.png    → ícone para iOS
    ├── og-image.png      → imagem de partilha (redes sociais)
    ├── hero.svg          → imagem grande do topo (ilustração)
    ├── edredons/         → fotos dos edredons (as "-web" têm a barra do fornecedor recortada)
    ├── tapetes/          → fotos dos tapetes
    └── mantas/           → fotos das mantas
```

---

## ✏️ Em 1 minuto: o que mudar antes de publicar

### 1) Contactos — ficheiro `script.js` (no topo, bloco `CONFIG`)
É o **único sítio** para ligar telefone, WhatsApp, email e redes sociais:

```js
const CONFIG = {
  whatsappNumber: "351912345678",   // 351 + número, só dígitos
  phone:          "+351 912 345 678",
  email:          "geral@casaealma.pt",
  instagram:      "https://instagram.com/casaealma",
  facebook:       "https://facebook.com/casaealma",
};
```

> Enquanto estiverem a `""` (vazios), o site mostra `[TELEFONE]` / `[EMAIL]`
> e os botões de WhatsApp levam à secção de contactos. Assim que preencher,
> tudo fica ativo automaticamente.

### 2) Textos, preços e horário — ficheiro `index.html`
Estão escritos diretamente no HTML, com comentários a indicar onde mexer.

- **Preços:** cada cartão em `index.html` (procurar `card__price`). Estão como
  "a partir de" — basta alterar o valor dentro de `<strong>…€</strong>`.
- **Horário:** secção `#visitar` (e também no bloco de dados estruturados
  `application/ld+json` dentro do `<head>`).
- **Entrega:** não há loja física — a zona de entrega (Furadouro e Ovar) está na secção `#visitar`.

### 3) Mapa do Google — ficheiro `index.html` (secção `#visitar`)
Troque a morada no `src` do `<iframe>`:

```
src="https://www.google.com/maps?q=Furadouro,+Ovar,+Portugal&output=embed"
```
O mapa mostra a **zona de entrega** (Furadouro e Ovar). Ajuste o `q=` se quiser outra zona.

### 4) Fotografias — pasta `assets/`
As fotos reais já estão colocadas (pastas `edredons/`, `tapetes/`, `mantas/`).
Os **cartões** da página inicial mostram uma foto de cada tipo; as **páginas de
produto** (`edredons.html`, `tapetes.html`, `mantas.html`) mostram **todas as cores**.
Para trocar/editar, muda o `src` no ficheiro respetivo. Onde aparece cada uma:

| Onde | Ficheiro a editar | Proporção |
|---|---|---|
| Foto do topo (hero) | `index.html` (`assets/mantas/MantaDourada.jpeg`) | vertical |
| Cartões (3 tipos) | `index.html` | 4:3 |
| Cores de cada tipo | `edredons.html` / `tapetes.html` / `mantas.html` | 4:5 (tapetes 4:3) |
| Partilha redes sociais | `assets/og-image.png` | 1200 × 630 |

Para **acrescentar ou remover uma cor**, duplique ou apague uma `<figure class="variant">`
na página do produto correspondente.

> As fotos dos **edredons** vinham com uma barra do fornecedor (modelo/referência/
> tamanhos). Criei versões **`-web.jpeg`** sem essa barra — são essas que o site usa.
> Os originais `.jpeg` continuam na pasta. Para novas fotos, prefira `.jpg`/`.webp` (≤ 300 KB).

### 5) Testemunhos — ficheiro `index.html` (secção `#testemunhos`)
São exemplos. Substitua o texto e os `[Nome do cliente]` por testemunhos
reais (por exemplo, dos comentários do Google Maps).

### 6) SEO local — ficheiro `index.html` (`<head>`)
No bloco `application/ld+json`, preencha `telephone` e as redes sociais em `sameAs`. Se já tiver domínio, troque
`https://www.casaealma.pt/` pelo endereço real (nas tags `canonical`,
`og:url` e `og:image`).

---

## 🚀 Publicar na Netlify (sem configuração)

1. Entre em [app.netlify.com](https://app.netlify.com) (crie conta grátis).
2. **Arraste esta pasta** para a área "Deploy" (ou "Add new site → Deploy manually").
3. Fica online em segundos num endereço `.netlify.app`.
4. (Opcional) Em *Domain settings*, ligue o seu domínio próprio.

Não é preciso instalar nada nem correr comandos — é um site estático.

---

## 🎨 Identidade visual

- **Cores** (em `style.css`, no topo, `:root`):
  - Principal: terracota `#A4583D`
  - Secundária: verde-azeitona `#79734A`
  - Destaque: ouro `#C0975A`
  - Fundo: creme `#F4F1EA` · Texto: `#38342A`
- **Tipografia** (Google Fonts): **Fraunces** (títulos) + **Mulish** (texto).

Paleta e tipografia escolhidas para o setor de decoração/têxteis — quentes,
naturais e com bom contraste. Ajuste tudo nas variáveis do `:root`.

---

## ✅ Checklist antes de ir para o ar

- [ ] Preencher `CONFIG` em `script.js` (WhatsApp, telefone, email, redes)
- [ ] Confirmar e corrigir os **preços** (e remover etiquetas "exemplo")
- [ ] Apontar o **mapa** para a morada exata
- [x] Fotos reais nos cartões, páginas de produto e hero
- [ ] Trocar os **testemunhos** por reais
- [ ] Preencher os **dados estruturados** (JSON-LD) no `<head>`
- [ ] (Com domínio) atualizar `canonical` / `og:url` / `og:image`

---

Feito à mão, sem frameworks. Qualquer alteração é só editar os ficheiros de texto.
