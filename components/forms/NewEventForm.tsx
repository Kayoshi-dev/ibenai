import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
  Group,
  useMantineTheme,
  Text,
  Container,
  InputWrapper,
  TextInput,
  createStyles,
  Title,
  Button,
  SimpleGrid,
  Grid,
  Box,
  Autocomplete,
  MantineTheme,
} from "@mantine/core";
import { ImageIcon, UploadIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { useDebouncedValue, useForm } from "@mantine/hooks";
import RichTextEditor from "../../components/forms/QuillEditor";
import { DatePicker } from "@mantine/dates";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const DraggableMarkerMap = dynamic(
  () => import("../../components/map/DraggableMarkerMap"),
  {
    ssr: false,
  }
);

// @ts-ignore
function ImageUploadIcon({ status, ...props }) {
  if (status.accepted) {
    return <UploadIcon {...props} />;
  }

  if (status.rejected) {
    return <CrossCircledIcon {...props} />;
  }

  return <ImageIcon {...props} />;
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
  return status.accepted
    ? theme.colors[theme.primaryColor][6]
    : status.rejected
    ? theme.colors.red[6]
    : theme.colorScheme === "dark"
    ? theme.colors.dark[0]
    : theme.black;
}

export default function NewEventForm() {
  const theme = useMantineTheme();
  const form = useForm<{
    coverPicture: File[] | null;
    title: string;
    description: string;
    address: string;
  }>({
    initialValues: {
      coverPicture: null,
      title: "",
      description: "",
      address: "",
    },

    validationRules: {},

    errorMessages: {},
  });

  const [debouncedSearch] = useDebouncedValue(form?.values.address, 500);

  /*  useEffect(() => {
    (async () => {
      const rawData = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${debouncedSearch}&format=json`
      );
      const formattedData = await rawData.json();

      console.log(formattedData);
    })();
  }, [debouncedSearch]);*/

  const onDropFile = (file: File[]) => {
    form.setFieldValue("coverPicture", file);
  };

  const useStyles = createStyles(() => ({
    root: {
      padding: form.values.coverPicture ? "0px" : "",
    },
  }));

  const { classes } = useStyles();

  return (
    <Container>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <InputWrapper
          label="Cover picture"
          error={
            form.errors.coverPicture &&
            "La photo de couverture n'est pas de type File"
          }
          required
        >
          <Dropzone
            onDrop={onDropFile}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            multiple={false}
            classNames={{ root: classes.root }}
          >
            {(status) => (
              <>
                {form.values.coverPicture ? (
                  <img
                    src={URL.createObjectURL(
                      new Blob(form.values.coverPicture)
                    )}
                    alt="The image you just uploaded !"
                    style={{
                      maxHeight: "256px",
                      objectFit: "cover",
                      minHeight: "256px",
                      width: "100%",
                    }}
                  />
                ) : (
                  <Group
                    position="center"
                    spacing="xl"
                    style={{ minHeight: 220, pointerEvents: "none" }}
                  >
                    <ImageUploadIcon
                      status={status}
                      style={{
                        width: 80,
                        height: 80,
                        color: getIconColor(status, theme),
                      }}
                    />

                    <div>
                      <Text size="xl" inline>
                        Drag images here or click to select files
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        Attach as many files as you like, each file should not
                        exceed 5mb
                      </Text>
                    </div>
                  </Group>
                )}
              </>
            )}
          </Dropzone>
        </InputWrapper>

        <Title>Indication of the place</Title>
        <TextInput
          required
          placeholder="Paris!"
          label="Event title"
          {...form.getInputProps("title")}
          style={{ marginBottom: "1em" }}
          radius="md"
        />

        <InputWrapper label="Description of the event" required>
          <RichTextEditor
            radius="md"
            value={form.values.description}
            onChange={(e) => form.setFieldValue("description", e)}
          />
        </InputWrapper>

        <SimpleGrid cols={2}>
          <DatePicker
            placeholder="Pick the starting date"
            label="Pick the starting date"
            required
          />

          <DatePicker
            placeholder="Pick the ending date"
            label="Pick the ending date"
            required
          />
        </SimpleGrid>

        <Title order={3}>Location of the event</Title>

        <Box
          sx={(theme) => ({
            borderRadius: theme.radius.md,
            marginBottom: theme.spacing.md,
            height: "450px",
          })}
        >
          <DraggableMarkerMap onChangeAdress={form.setFieldValue} />
        </Box>

        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Choose the location of the event"
              placeholder="Pick one"
              {...form.getInputProps("address")}
            />
          </Grid.Col>
        </Grid>

        <Button type="submit" color="indigo" radius="md">
          Créer !
        </Button>
      </form>
    </Container>
  );
}
