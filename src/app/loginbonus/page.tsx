"use client";
import React, { Suspense } from 'react';
import LoginBonus from '../components/LoginBonus/LoginBonus';

export default function Login_Bonus() {
  return (
      <main>
        <Suspense>
          <LoginBonus />
        </Suspense>
      </main>
  );
}
