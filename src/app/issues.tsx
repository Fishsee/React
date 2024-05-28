import React from 'react';

import { Button, FocusAwareStatusBar, View } from '@/ui';

function Issues() {
  return (
    <>
      <FocusAwareStatusBar />
      <View className="flex flex-1 items-center ">
        <Button className="mt-[100px] h-[8%] w-[75%] rounded-md border-[1px] border-neutral-300 bg-[#F5F3F3] p-2 " />
      </View>
    </>
  );
}

export default Issues;
