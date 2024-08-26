import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { trpc } from "../../../trpc";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type Props = {
  show: boolean;
  onRequestClose: (created: boolean) => void;
};

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "grid",
  gridTemplateColumns: "1fr",
  gridGap: 20,
  minWidth: 500,
};

export default function CreateDeckModal({ show, onRequestClose }: Props) {
  const [deckName, setDeckName] = useState("");
  const [description, setDescription] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [success, setSuccess] = useState(false);

  const deckCreator = trpc.decks.create.useMutation();

  return (
    <Modal open={show} onClose={() => onRequestClose(false)}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2">
          Create Deck
        </Typography>
        <TextField
          required
          label="Deck Name"
          variant="outlined"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
        />
        <TextField
          multiline
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          label="Cover Image URL"
          variant="outlined"
          value={coverImageUrl}
          onChange={(e) => setCoverImageUrl(e.target.value)}
        />
        <Box sx={{ justifySelf: "end" }}>
          {success ? (
            <CheckCircleIcon sx={{ color: "success.main" }} />
          ) : (
            <Button
              variant="contained"
              disabled={deckName.trim().length == 0}
              onClick={async () => {
                try {
                  await deckCreator.mutateAsync({
                    name: deckName,
                    description,
                    coverImageUrl,
                  });
                  setSuccess(true);
                  setTimeout(() => onRequestClose(true), 200);
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              Create
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
}
