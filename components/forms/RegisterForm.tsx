import {
  Button,
  Checkbox,
  PasswordInput,
  Progress,
  TextInput,
  Popover,
  InputWrapper,
  useMantineTheme,
} from "@mantine/core";
import {
  EnvelopeOpenIcon,
  LockClosedIcon,
  PersonIcon,
} from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm, useMediaQuery } from "@mantine/hooks";

export default function RegisterForm() {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
      termsAndCondition: false,
    },

    validationRules: {
      email: (value) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value),
      username: (value) => /^[a-zA-Z0-9]{3,}$/.test(value),
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      passwordConfirm: (confirmPassword, values) =>
        confirmPassword === values?.password,
      termsAndCondition: (value) => value === true,
    },

    errorMessages: {
      email: "Please enter a valid email address",
      username: "Please enter a valid username",
      password: "Please enter a valid password",
      passwordConfirm: "Passwords do not match",
      termsAndCondition: "Please accept the terms and conditions",
    },
  });

  return (
    <form
      method="post"
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <TextInput
        placeholder="foo@bar.fr"
        label="Your email"
        icon={<EnvelopeOpenIcon />}
        sx={(theme) => ({ marginBottom: theme.spacing.md })}
        {...form.getInputProps("email")}
        required
      />

      <TextInput
        placeholder="Your username"
        label="Your username"
        description="Your username is used to identify you on the site and will be displayed publicly on your profile"
        icon={<PersonIcon />}
        sx={(theme) => ({ marginBottom: theme.spacing.md })}
        {...form.getInputProps("username")}
        required
      />

      <Popover
        opened={popoverOpened}
        position="right"
        placement="end"
        withArrow
        style={{ width: "100%" }}
        styles={{ popover: { width: "100%" } }}
        sx={(theme) => ({ marginBottom: theme.spacing.md })}
        trapFocus={false}
        transition="pop-top-left"
        onFocusCapture={() => setPopoverOpened(true)}
        onBlurCapture={() => setPopoverOpened(false)}
        target={
          <PasswordInput
            color="indigo"
            required
            label="Your password"
            placeholder="Your password"
            description="Strong password should include letters in lower and uppercase, at least 1 number, at least 1 special symbol"
            icon={<LockClosedIcon />}
            {...form.getInputProps("password")}
          />
        }
      >
        <Progress
          color="red"
          value={30}
          size={5}
          style={{ marginBottom: 10 }}
        />
        {/*<PasswordRequirement*/}
        {/*  label="Includes at least 6 characters"*/}
        {/*  meets={value.length > 5}*/}
        {/*/>*/}
        {"yo"}
      </Popover>

      <PasswordInput
        placeholder="The same password as above"
        label="Repeat your password"
        icon={<LockClosedIcon />}
        radius="md"
        sx={(theme) => ({ marginBottom: theme.spacing.md })}
        {...form.getInputProps("passwordConfirm")}
        required
      />

      <InputWrapper
        required
        sx={(theme) => ({ marginBottom: theme.spacing.md })}
      >
        <Checkbox
          color="indigo"
          label="I agree with the terms and conditions"
          {...form.getInputProps("termsAndCondition", { type: "checkbox" })}
        />
      </InputWrapper>

      <Button color="indigo" type="submit" style={{ width: "100%" }}>
        Register
      </Button>
    </form>
  );
}
