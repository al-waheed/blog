import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./pages/PostDetail";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-md sticky top-0 z-50">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  <Link to="/" className="text-2xl font-bold text-blue-600">
                    Blog App
                  </Link>
                  <div className="space-x-4">
                    <Link to="/" className="text-gray-600 hover:text-gray-900">
                      Home
                    </Link>
                    <Link to="/create" className="btn">
                      Create Post
                    </Link>
                  </div>
                </div>
              </div>
            </nav>

            <main className="min-h-screen">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
              </Routes>
            </main>

            <footer className="bg-gray-800 text-white py-8">
              <div className="container mx-auto px-4 text-center">
                <p>© 2025 Blog App. Share your stories with the world.</p>
              </div>
            </footer>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
