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
  MantineTheme,
} from "@mantine/core";
import { ImageIcon, UploadIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import RichTextEditor from "../../components/forms/QuillEditor";
import { DatePicker, TimeInput } from "@mantine/dates";
import dynamic from "next/dynamic";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useEffect } from "react";
import { joiResolver, useForm } from "@mantine/form";
import { ClockIcon } from "@modulz/radix-icons";
import { BsCalendarEvent } from "react-icons/bs";
import NewEventSchema from "../../utils/schemas/NewEventSchema";
import { getApiUrl } from "../../utils/getEnv";
import { LatLng } from "leaflet";

const DraggableMarkerMap = dynamic(
  () => import("../../components/map/DraggableMarkerMap"),
  {
    ssr: false,
  }
);

interface FormValues {
  coverPicture: File | null;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  startTime: Date | string;
  endDate: Date;
  endTime: Date | string;
  position: LatLng;
}

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

const handleForm = async (values: FormValues) => {
  const formData = new FormData();

  for (const input in values) {
    if (input === "coverPicture") {
      formData.append("coverPicture", values.coverPicture[0]);
    } else {
      console.log(values[input]);
      formData.append(input, values[input]);
    }
  }

  const newEvent = await fetch(`${getApiUrl()}events/`, {
    method: "POST",
    body: formData,
  });

  console.log("done");
};

export default function NewEventForm() {
  const theme = useMantineTheme();
  const form = useForm<FormValues>({
    schema: joiResolver(NewEventSchema),
    initialValues: {
      coverPicture: null,
      title: "",
      description: "",
      location: "",
      startDate: new Date(),
      startTime: "",
      endDate: new Date(),
      endTime: "",
      position: {
        lat: 45.188529,
        lng: 5.724524,
      },
    },
  });

  // Use effect about start and end date
  useEffect(() => {
    if (form.values.startDate > form.values.endDate) {
      form.setFieldValue("endDate", form.values.startDate);
    }
  }, [form]);

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
    <form onSubmit={form.onSubmit(handleForm)} encType="multipart/form-data">
      <InputWrapper
        label="Cover picture"
        pb="md"
        error={form.errors.coverPicture}
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
                  src={URL.createObjectURL(new Blob(form.values.coverPicture))}
                  alt="The image you just uploaded !"
                  style={{
                    maxHeight: "256px",
                    objectFit: "cover",
                    minHeight: "256px",
                    width: "100%",
                    borderRadius: theme.radius.md,
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

      <TextInput
        required
        placeholder="Let's visit the new museum of Paris !"
        label="Event title"
        {...form.getInputProps("title")}
        style={{ marginBottom: "1em" }}
        radius="md"
      />

      <InputWrapper
        label="Description of the event"
        pb="md"
        error={form.errors.description}
        required
      >
        <RichTextEditor
          styles={{ root: { minHeight: "10em" } }}
          radius="md"
          value={form.values.description}
          onChange={(e) => form.setFieldValue("description", e)}
        />
      </InputWrapper>

      <SimpleGrid cols={2} pb="md">
        <DatePicker
          radius="md"
          icon={<BsCalendarEvent />}
          minDate={new Date()}
          placeholder="Pick the starting date"
          label="Pick the starting date"
          {...form.getInputProps("startDate")}
          required
        />

        <TimeInput
          radius="md"
          label="Pick starting time"
          placeholder="Pick time"
          icon={<ClockIcon />}
          {...form.getInputProps("startTime")}
          clearable
        />

        <DatePicker
          radius="md"
          icon={<BsCalendarEvent />}
          minDate={form.values.startDate}
          placeholder="Pick the ending date"
          label="Pick the ending date"
          {...form.getInputProps("endDate")}
          required
        />

        <TimeInput
          radius="md"
          label="Pick ending time"
          placeholder="Pick time"
          icon={<ClockIcon />}
          {...form.getInputProps("endTime")}
          clearable
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
        <DraggableMarkerMap
          updateFormValues={form.setFieldValue}
          position={form.values.position}
        />
      </Box>

      <Group position="center">
        <Text>
          <FaMapMarkerAlt /> Lat: {form.values.position.lat}, Long:{" "}
          {form.values.position.lng}
        </Text>
      </Group>

      <Grid pb="md">
        <Grid.Col span={12}>
          <TextInput
            radius="md"
            label="Change the location name of the event (if needed)"
            required
            {...form.getInputProps("location")}
          />
        </Grid.Col>
      </Grid>

      <Button type="submit" color="indigo">
        Submit !
      </Button>
    </form>
  );
}
