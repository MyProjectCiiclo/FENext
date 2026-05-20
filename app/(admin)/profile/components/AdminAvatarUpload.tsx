"use client";

import { useRef, useState } from "react";

export function AdminAvatarUpload (initialAvatar: string) {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [avatar, setAvatar] = useState(initialAvatar);

  function handleAvatarClick() {
    fileRef.current?.click();
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setAvatar(url);
  }

  return {
    avatar,
    fileRef,
    handleAvatarClick,
    handleAvatarChange,
  };
}