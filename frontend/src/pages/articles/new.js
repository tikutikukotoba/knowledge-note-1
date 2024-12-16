import { parse } from 'marked'; // marked.jsをインポート
import DOMPurify from 'dompurify'; // DOMPurifyをインポート
import mustache from 'mustache';
import html from '../../templates/articles/new.html?raw';

/**
 * 記事新規作成時の処理の関数
 */
export const articlesNew = () => {
  const app = document.querySelector('#app');
  app.innerHTML = mustache.render(html, {});

  const textarea = document.getElementById('editor-textarea');
  const previewArea = document.getElementById('preview-area');

  // 入力内容が変更されるたびにプレビューを更新
  textarea.addEventListener('input', function () {
    const markdownText = textarea.value;
    const htmlText = DOMPurify.sanitize(parse(markdownText)); // マークダウンをHTMLに変換してサニタイズ
    previewArea.innerHTML = htmlText; // サニタイズされたHTMLを表示
  });
  
  document.querySelector('#articles-new-from').addEventListener('submit',(event) =>{
    event.preventDefault();
    console.log(event.target.titel.value);
    console.log(event.target.body.value);
    fetch('/api/v1/articles', {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        titel:event.target.titel.value,
        body:event.target.body.value
      }),
      method: 'POST',
    })
    .then(res =>
      new Promise((resolve, reject) => res.ok ? resolve(res.json()) : reject(res.text())))
    .then(json => {
      if(isSuccess){
        navigate('/mypage');
      }else{

      };
    })
  });
};