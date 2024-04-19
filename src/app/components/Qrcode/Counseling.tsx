'use client'
import React, { useState } from 'react';

// コンポーネントのプロパティの型を定義します（今回は使いませんが、将来の拡張のために残しています）
interface CounselingProps {
}

const Counseling: React.FC<CounselingProps> = () => {
  // 状態として入力内容を保持する
  const [input, setInput] = useState('');

  // 入力内容が変更されたときに呼ばれるハンドラー
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  // フォーム送信時の処理
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // ページの再読み込みを防止
    alert('入力内容: ' + input); // 実際のアプリケーションではここでサーバーへデータを送信します
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        相談内容を入力してください。
        <textarea value={input} onChange={handleChange} />
      </label>
      <button type="submit">送信</button>
    </form>
  );
};

export default Counseling;