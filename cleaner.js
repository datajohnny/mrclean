import posthtml from 'posthtml';
import postcss from 'postcss';
import inlineStyles from 'posthtml-inline-css';

export default function(html) {
  return posthtml()
    .use((tree) => {
      let nodeCSS = [];

      tree.match({ tag: 'style' }, (node) => {
        nodeCSS.push(node.content);
      });

      let { css } = postcss([require('postcss-merge-rules')])
            .process(nodeCSS.join(''), { sync: true });

      tree.match({ tag: 'head' }, (node) => {
        return Object.assign(node, {
          tag: 'style',
          content: css
        });
      });

      return tree;
    })
    .process(html, { sync: true })
    .html;
}
