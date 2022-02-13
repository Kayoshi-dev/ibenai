import { Button, useMantineTheme } from "@mantine/core"

export declare interface IOAuthButtonProps {
  provider: "Facebook" | "Google" | "Twitter"
  link: string
  icon: JSX.Element
}

export default function OAuthButton({
  provider,
  link,
  icon,
}: IOAuthButtonProps) {
  return (
    <Button
      color="indigo"
      component="a"
      variant="outline"
      size="lg"
      radius="md"
      target="_blank"
      rel="noopener noreferrer"
      href={link}
      style={{ width: "100%" }}
      sx={(theme) => ({
        color: theme.colors.dark[5],
        borderColor: theme.colors.gray[4],
      })}
    >
      Connect with {provider} {icon}
    </Button>
  )
}
