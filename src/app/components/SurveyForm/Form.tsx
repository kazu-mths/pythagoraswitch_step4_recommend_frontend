'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import UserTokenComponent from '../../components/Qrcode/UserTokenComponent';  // UserTokenComponent をインポート

export default function SurveyForm() {
  const [answers, setAnswers] = useState({ q1: '', q2: '', q3: '' });
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // トークンが確認できたら、トークンの状態をログに出力
    if (token) {
        console.log("Current token in SurveyForm:", token);
    }
}, [token]);

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // トークンがなければエラー
    if (!token) {
        alert('トークンが利用できません。再度ログインしてください。');
        return;
    }

    // 回答がすべてされているか確認
    if (!answers.q1 || !answers.q2 || !answers.q3) {
        alert('すべての質問に回答してください。');
        return;
    }

    // 回答データの構築
    const surveyResponses = [
      { question_id: 'q1', answer_text: answers.q1 },
      { question_id: 'q2', answer_text: answers.q2 },
      { question_id: 'q3', answer_text: answers.q3 }
    ];

    try {
        const response = await fetch(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/survey?token=${encodeURIComponent(token)}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(surveyResponses)
        });

        if (response.ok) {
            router.push(`https://tech0-gen-5-step4-studentwebapp-1.azurewebsites.net/mypage?token=${encodeURIComponent(token)}`);
        } else {
            const error = await response.json();
            alert(`アンケートの送信に失敗しました: ${error.detail || 'サーバーエラー'}`);
        }
    } catch (error) {
        console.error('アンケート送信中にエラーが発生しました:', error);
        alert('アンケートの送信に失敗しました。再度試してください。');
    }
};

  const handleAnswerChange = (question: string, value: string) => {
      setAnswers(prev => ({ ...prev, [question]: value }));
  };

return (
    <div>
        <Suspense fallback={<div>Loading...</div>}>
            <UserTokenComponent setToken={setToken} />
        </Suspense>
        <form onSubmit={handleSubmit}>
            <h1>Survey Questions</h1>
            <div>
                <label>Question 1:
                <select onChange={e => handleAnswerChange('q1', e.target.value)}>
                        <option value="">Select</option>
                        <option value="Very Satisfied">Very Satisfied</option>
                        <option value="Satisfied">Satisfied</option>
                    </select>
                </label>
            </div>
            <div>
                <label>Question 2:
                    <select onChange={e => handleAnswerChange('q2', e.target.value)}>
                        <option value="">Select</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                    </select>
                </label>
            </div>
            <div>
                <label>Question 3:
                    <select onChange={e => handleAnswerChange('q3', e.target.value)}>
                        <option value="">Select</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                    </select>
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
  );
}
