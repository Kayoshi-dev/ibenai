import { useState, useEffect, forwardRef, useRef } from "react";
import { useRouter } from "next/router";
import { useForm, useDebouncedValue } from "@mantine/hooks";
import {
  TextInput,
  Button,
  Container,
  Group,
  useMantineTheme,
  Text,
  Grid,
  Col,
  MultiSelect,
  Checkbox,
  InputWrapper,
  Autocomplete,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import {
  CameraIcon,
  UploadIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";

export default function Create() {
  const [currentHeader, setCurrentHeader] = useState("");

  const dropZoneRef = useRef();

  const theme = useMantineTheme();

  const form = useForm({
    initialValues: {},

    validationRules: {},
  });

  // Update the icon displayed based on the file dragged
  // @ts-ignore
  const ImageUploadIcon = ({ status, ...props }) => {
    if (status.accepted) {
      return <UploadIcon {...props} />;
    }

    if (status.rejected) {
      return <CrossCircledIcon {...props} />;
    }

    return <CameraIcon {...props} />;
  };

  // Update IconColor based on the drag event
  const getIconColor = (status, theme) => {
    return status.accepted
      ? theme.colors[theme.primaryColor][6]
      : status.rejected
      ? theme.colors.red[6]
      : theme.colorScheme === "dark"
      ? theme.colors.dark[0]
      : theme.black;
  };

  //Handle the header uploading to the form
  const handleHeaderUpload = (file) => {
    form.setFieldValue("header", file);
    setCurrentHeader(file);
  };

  return (
    <Container>
      <form encType="multipart/form-data" method={"post"}>
        <h1>Créer un nouvel évènement</h1>

        <InputWrapper
          label="Ajouter une photo de couverture"
          style={{ marginBottom: "1em" }}
          error={
            form.errors.header &&
            "La photo de couverture n'est pas de type File"
          }
        >
          <Dropzone
            ref={dropZoneRef}
            onDrop={handleHeaderUpload}
            maxSize={3 * 1024 ** 2}
            accept={["image/png", "image/jpeg", "image/sgv+xml"]}
            multiple={false}
            styles={currentHeader ? { root: { padding: "0px" } } : ""}
            id="dropzone-header"
            value={form.values.header}
          >
            {(status) => (
              <>
                {currentHeader ? (
                  <img
                    src={URL.createObjectURL(new Blob(form.values.header))}
                    alt="Alternative text for image"
                    style={{
                      maxHeight: "228px",
                      objectFit: "cover",
                      minHeight: "228px",
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
                        Faites glisser la photo de couverture de votre évènement
                      </Text>
                      <Text size="sm" color="dimmed" inline mt={7}>
                        Faites attention que l&apos;image ne soit pas trop
                        lourde :)
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
          placeholder="Sortie à Paris !"
          label="Titre de votre évènement"
          error={
            form.errors.title &&
            "Veuillez spécifier un titre pour votre évènement"
          }
          value={form.values.title}
          onChange={(event) =>
            form.setFieldValue("title", event.currentTarget.value)
          }
          style={{ marginBottom: "1em" }}
        />

        {/*        <InputWrapper
          label="Description de l'évènement"
          required
          style={{ marginBottom: "1em" }}
          error={
            form.errors.description &&
            "Veuillez spécifier une description pour votre évènement (minimum 10 caractères)"
          }
        >
          <RichTextEditor
            value={form.values.description}
            onChange={(e) => form.setFieldValue("description", e)}
          />
        </InputWrapper>*/}

        <Grid style={{ marginBottom: "1em" }}>
          {/*          <Col span={12} md={6}>
            <InputWrapper
              label="Date de commencement"
              required
              error={
                form.errors.startDate &&
                "Veuillez saisir une date de début d'évènement"
              }
            >
              <DatePicker
                dateFormat="dd/MM/yyyy"
                calendarStartDay={1}
                selectsStart
                minDate={Date.now()}
                startDate={form.values.startDate}
                endDate={form.values.endDate}
                locale="fr"
                selected={form.values.startDate}
                onChange={(date) => form.setFieldValue("startDate", date)}
                className="mantine-TextInput-input"
                value={form.values.startDate}
              />
            </InputWrapper>
          </Col>
          <Col span={12} md={6}>
            <InputWrapper
              label="Date de fin"
              required
              error={
                form.errors.endDate &&
                "Veuillez saisir une date de fin d'évènement"
              }
            >
              <DatePicker
                dateFormat="dd/MM/yyyy"
                calendarStartDay={1}
                locale="fr"
                selectsEnd
                minDate={form.values.startDate}
                startDate={form.values.startDate}
                endDate={form.values.endDate}
                selected={form.values.endDate}
                onChange={(date) => form.setFieldValue("endDate", date)}
                className="mantine-TextInput-input"
              />
            </InputWrapper>
          </Col>*/}
          {/*          <Col span={12} md={5}>
            <Autocomplete
              value={form.values.adress}
              onChange={(adress) => form.setFieldValue("adress", adress)}
              label="Indiquez l'adresse de rendez-vous"
              placeholder="Rue de l'internet..."
              required
              data={suggestions}
              filter={(_, item) => item}
              itemComponent={AutoCompleteItem}
              onItemSubmit={handleItemConfirmation}
              error={form.errors.adress && "Veuillez préciser l'adresse"}
            />
          </Col>*/}

          <Col span={12} md={4}>
            <TextInput
              required
              placeholder="Paris, Grenoble...."
              label="Ville"
              error={form.errors.city && "Veuillez spécifier une ville..."}
              value={form.values.city}
              onChange={(event) =>
                form.setFieldValue("city", event.currentTarget.value)
              }
            />
          </Col>

          <Col span={12} md={3}>
            <TextInput
              required
              placeholder="96440"
              label="Code postal"
              error={
                form.errors.zipCode && "Veuillez renseigner le code postal"
              }
              value={form.values.zipCode}
              onChange={(event) =>
                form.setFieldValue("zipCode", event.currentTarget.value)
              }
            />
          </Col>
        </Grid>

        <MultiSelect
          label="Ajouter des participants"
          data={[]}
          placeholder="emmanuel.macron@elysee.fr"
          searchable
          creatable
          getCreateLabel={(query) => `+ Ajouter l'adresse mail : ${query}`}
          onCreate={(query) => setAttendees((current) => [...current, query])}
          style={{ marginBottom: "1em" }}
        />

        <Checkbox
          label="Cet évènement est privé"
          style={{ marginBottom: "1em" }}
          color="indigo"
        />

        <Button type="submit" color="indigo">
          Créer !
        </Button>
      </form>
    </Container>
  );
}
