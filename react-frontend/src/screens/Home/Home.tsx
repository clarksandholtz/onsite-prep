import { useState } from "react";
import { trpc } from "../../trpc";
import AllDecksTable from "./components/AllDecksTable";
import CreateDeckModal from "./components/CreateDeckModal";
import { Box } from "@mui/material";

export default function Home() {
  const {
    data: allDecks,
    isLoading,
    refetch,
    error,
  } = trpc.decks.all.useQuery();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const openShowModal = () => setShowCreateModal(true);
  const closeShowModal = () => setShowCreateModal(false);

  return (
    <Box sx={{ width: "100vw", height: "100vh", p: 6 }}>
      <AllDecksTable
        decks={allDecks}
        onAddClicked={openShowModal}
        loading={isLoading}
        errorMessage={error?.message}
      />
      <CreateDeckModal
        show={showCreateModal}
        onRequestClose={(created) => {
          closeShowModal();
          if (created) refetch();
        }}
      />
    </Box>
  );
}
