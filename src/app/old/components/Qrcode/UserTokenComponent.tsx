'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface UserTokenComponentProps {
  setToken: (token: string | null) => void;
}

const UserTokenComponent: React.FC<UserTokenComponentProps> = ({ setToken }) => {
  const searchParams = useSearchParams();
  const user_token = searchParams.get("token");

  useEffect(() => {
    if (user_token) {
      setToken(user_token);
    } else {
      alert('No token found. Please make sure you are logged in.');
    }
  }, [user_token, setToken]);

  return null;  // このコンポーネントはビジュアルをレンダリングしない
};

export default UserTokenComponent;