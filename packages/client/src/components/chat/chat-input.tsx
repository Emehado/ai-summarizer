import React from 'react';
import { Button } from '../ui/button';
import { ArrowUp, PlusIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

const ChatInput = ({ onSubmit }: Props) => {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
      reset({ prompt: '' });
    }
  };

  const fh = handleSubmit((data) => {
    onSubmit(data);
    reset({ prompt: '' });
  });

  return (
    <div className="fixed mx-auto container max-w-5xl inset-x-0 bottom-0 px-5 pb-5 bg-popover">
      <form
        onSubmit={fh}
        className=" border-2 flex p-3 flex-col border-gray-200 rounded-xl shadow-md "
      >
        <textarea
          {...register('prompt', {
            required: true,
            validate: (data) => data.trim().length > 0,
          })}
          autoFocus
          className="w-full min-h-24 overflow-auto flex-grow resize-none outline-0"
          placeholder="Ask anything"
          maxLength={1000}
          onKeyDown={onKeyDown}
        ></textarea>
        <div className="flex ">
          <div className="flex-grow">
            <Button
              type="button"
              variant="ghost"
              className="rounded-full h-9 w-9"
            >
              <PlusIcon color="gray" strokeWidth={2.5} className="w-56 h-56" />
            </Button>
          </div>
          <Button
            type="submit"
            className="rounded-full h-9 w-9"
            disabled={!formState.isValid}
          >
            <ArrowUp />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
