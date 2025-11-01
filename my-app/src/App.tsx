import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import ItemsList from "./Components/ItemsList/ItemsList.component";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        className="border-b border-gray-200 bg-white"
      >
        <Toolbar className="flex justify-between max-w-6xl mx-auto w-full py-3">
          <Typography
            variant="h6"
            className="font-bold text-gray-800 tracking-tight"
          >
            🧾 List of Items
          </Typography>
        </Toolbar>
      </AppBar>

      <main className="py-10">
        <Container maxWidth="md">
          <ItemsList />
        </Container>
      </main>
    </div>
  );
}

export default App;
