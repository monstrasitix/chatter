import { Control } from "@/component/control";
import { AuditToken, Conversation, useAudit } from "@/hooks/conversations";
import { clsx } from "clsx";
import { useState } from "react";
import * as yup from "yup";
import { FieldValues, useForm, FormProvider } from "react-hook-form";
import { useYupValidationResolver } from "@/hooks/yup-resolver";
import { Option, Select } from "@/component/select";
import { randomElement, randomInteger, randomUUID } from "@/utils/random";
import { getRandomTokens } from "@/utils/random-tokens";

interface Values extends FieldValues {
  company: string;
  solution?: string;
  problem?: string;
  tone?: string;
  ask: string;
}

interface Props {
  conversation: Conversation;
}

const schema = yup.object({
  company: yup.string().required(),
  solution: yup.string().required(),
  problem: yup.string().required(),
  tone: yup.string().required(),
  ask: yup.string().required(),
});

const tones: Option[] = [
  { value: "optimistic", label: "Optimistic" },
  { value: "informal", label: "Informal" },
  { value: "formal", label: "Formal" },
];

const companies: Option[] = [
  { value: "private-limited", label: "Private limited" },
  { value: "public-limited", label: "Public limited" },
];

const problems: Option[] = [
  { value: "issues", label: "Issues" },
  { value: "financial", label: "Financial" },
  { value: "mentoring", label: "Mentoring" },
];

const solutions: Option[] = [
  { value: "fast", label: "Fast" },
  { value: "slow", label: "Slow" },
];

export default function Prompt({ conversation }: Props) {
  const [openSettings, setOpenSettings] = useState(false);
  const updateAudit = useAudit();

  const form = useForm<Values>({
    mode: "onBlur",
    // @ts-ignore
    resolver: useYupValidationResolver(schema),
    defaultValues: {
      ask: "",
      company: conversation.company ?? "public-limited",
      problem: conversation.problem ?? "financial",
      solution: conversation.solution ?? "fast",
      tone: conversation.tone ?? "informal",
    },
  });

  const handleSettings = () => {
    setOpenSettings((open) => !open);
  };

  const handleSubmit = async (values: any) => {
    setOpenSettings(false);

    updateAudit(conversation.id, {
      id: randomUUID(),
      type: "user",
      message: values.ask,
    });

    setTimeout(() => {
      updateAudit(conversation.id, {
        type: "ai",
        id: randomUUID(),
        tokens: getRandomTokens(),
      });
    }, 200);

    form.setValue("ask", "");
  };

  return (
    <div className="container -medium">
      <FormProvider {...form}>
        <form className="prompt" onSubmit={form.handleSubmit(handleSubmit)}>
          <div
            className={clsx("prompt-options", {
              "-open": openSettings,
            })}
          >
            <div className="grid -columns-2 -gap-4">
              <Select
                register={form.register("company")}
                options={companies}
                label="Company"
              />
              <Select
                register={form.register("problem")}
                options={problems}
                label="Problem"
              />
              <Select
                register={form.register("solution")}
                options={solutions}
                label="Solution"
              />
              <Select
                label="Tone"
                register={form.register("tone")}
                options={tones}
              />
            </div>
          </div>

          <div className="prompt-input">
            <Control
              register={form.register("ask")}
              placeholder="Ask something"
            />

            <button
              type="button"
              onClick={handleSettings}
              className="button -primary"
            >
              Settings
            </button>

            <button type="submit" className="button -primary">
              Send
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
