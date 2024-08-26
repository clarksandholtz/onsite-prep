import {
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { Deck } from "../../../models/decks";
import AddIcon from "@mui/icons-material/Add";

type Props = {
  decks?: Deck[];
  loading: boolean;
  errorMessage?: string | null;
  onAddClicked?: () => void;
};

export default function AllDecksTable({
  decks,
  loading,
  errorMessage,
  onAddClicked,
}: Props) {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", pb: 4 }}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" component="div">
            All Decks
          </Typography>
          {!loading && (
            <IconButton onClick={onAddClicked}>
              <AddIcon />
            </IconButton>
          )}
        </Toolbar>
        {loading && <LinearProgress />}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontFamily: "monospace", width: 100 }}>
                  id
                </TableCell>
                <TableCell>Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {decks?.map((deck) => (
                <TableRow sx={{ cursor: "pointer" }} key={deck.id}>
                  <TableCell sx={{ fontFamily: "monospace", width: 100 }}>
                    {deck.id}
                  </TableCell>
                  <TableCell>{deck.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
