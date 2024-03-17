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
    setToken(user_token);
  }, [user_token, setToken]);

  return null;  // このコンポーネントはビジュアルをレンダリングしない
};

export default UserTokenComponent;