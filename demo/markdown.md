# 1. Heading Level 1

## Heading Level 2

### Heading Level 3

This is a paragraph containing **bold text**, *italicized text*, and ~~strikethrough~~. You can also combine them, like ***bold and italic***.

---

### 2. Lists and Tasks

* Item one with a [link](https://google.com)
* Item two
  1. Sub-item A
  2. Sub-item B
* [x] Completed task
* [ ] Incomplete task

### 3. Blockquotes and Inline Code
>
> "Markdown is intended to be as easy-to-read and easy-to-write as is feasible."
>
> -- John Gruber

To install the dependencies, run `npm install --save-dev`. This uses `inline code` tokens.

### 4. Tables

| Feature | Support | Color Test |
| :--- | :---: | ---: |
| Red Palette | High | #5a1d1d |
| Blue Palette | High | #1a3a4a |
| Tables | Native | |

### 5. Images and Footnotes

![Alt text for image](https://via.placeholder.com/150 'Optional Hover Title')

Here is a simple footnote reference[^1].

### 6. Embedded Code (Syntax Stress Test)

Below is a block of TypeScript embedded within Markdown:

```typescript
const themeName: string = 'Deep Red Blue';

function logTheme(name: string): void {
  console.log(`Current theme: ${name}`);
}
```

### 7. Math and HTML Entities

When using LaTeX in Markdown:
$$e^{i\pi} + 1 = 0$$

HTML entities: &copy; &reg; &trade; &nbsp;

[^1]: This is the footnote content at the bottom of the document.
