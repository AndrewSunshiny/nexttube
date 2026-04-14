'use client';

import { Provider } from 'react-redux';
import { makeStore } from '~/store/store';
import React, { useState } from 'react';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}
