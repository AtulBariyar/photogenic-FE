import { useState, useRef, useEffect, useContext } from "react";
import Header from "./components/Header";
import Toolbox from "./components/Toolbox";
import Editor from "./components/Editor";
import OperationsPanel from "./components/OperationsPanel";
import Gallery from "./components/Gallery";
import Alert from "./components/Alert";
import AuthForm from "./components/AuthForm";

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [operations, setOperations] = useState([]);
  const [activeTool, setActiveTool] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cropParams, setCropParams] = useState({
    unit: "px",
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [rotateAngle, setRotateAngle] = useState(0);
  const [notification, setNotification] = useState(null);
  // const [isClicked, setIsClicked] = useState(false);
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [format, setFormat] = useState("");
  const [view, setView] = useState("login");
  const [savedImages, setSavedImages] = useState([]);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  const login = async (data) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setAuth({
          isAuthenticated: true,
          user: { email: data.email, name: "Test User" },
          token: "jwt-token",
        });
        setView("editor");
        setLoading(false);
      }, 1500);
    } catch (error) {
      setNotification({ type: "error", message: "Login failed" });
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      setTimeout(() => {
        setAuth({
          isAuthenticated: true,
          user: { email: data.email, name: data.name },
          token: "jwt-token",
        });
        setView("editor");
        setLoading(false);
      }, 1500);
    } catch (error) {
      setNotification({ type: "error", message: "Registration failed" });
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null });
    setView("login");
    setImage(null);
    // setProcessedImage(null);
  };

  const saveImage = () => {
    if (preview) {
      setSavedImages((prev) => [...prev, preview]);
      setNotification({
        type: "success",
        message: "Image saved successfully!",
      });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileType = file.type;
      const extension = fileType.split("/").pop();
      setFormat(extension);
      reader.onload = () => {
        setImage(reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setNotification({
      type: "success",
      message: "Image uploaded successfully!",
    });
  };

  useEffect(() => {}, [format]);

  const downloadImage = (fileformat) => {
    if (!preview) return;

    console.log("File format:", fileformat);

    const link = document.createElement("a");
    let fileName = "Photogenic-edit";

    if (fileformat === "jpeg") {
      fileName += ".jpg";
    } else if (fileformat === "png") {
      fileName += ".png";
    } else if (fileformat === "webp") {
      fileName += ".webp";
    } else if (fileformat === "pdf") {
      fileName += ".pdf";
    } else {
      fileName += ".png";
    }

    link.download = fileName;
    link.href = preview;
    link.click();
  };

  const handleExport = (fileformat) => {
    alert(`Image exported as ${fileformat}`);
    //setFormat(fileformat);
    downloadImage(fileformat);
  };

  const deleteImage = () => {
    alert(`Do you really want to delete current image ?`);
    setPreview(null);
    setImage(null);
    setCropParams({ unit: "px", x: 0, y: 0, width: 100, height: 100 });
    setActiveTool(null);
  };

  const resetChanges = () => {
    setPreview(image);
    setRotateAngle(0);
    setCropParams({ x: 10, y: 10, width: 80, height: 80 });
    setActiveTool(null);
    setNotification({
      type: "success",
      message: "Reset to Original Image!",
    });
  };

  const handleRotate = (angle, manualInput = false) => {
    if (!manualInput) {
      setRotateAngle((prev) => prev + angle);
    } else {
      setRotateAngle(angle);
    }
  };

  const applyChanges = () => {
    setOperations((prev) => [
      ...prev,
      {
        type: activeTool,
        params: activeTool === "crop" ? cropParams : rotateAngle,
      },
    ]);
    setActiveTool(null);
    setNotification({
      type: "success",
      message: `Image ${activeTool} successful!`,
    });
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {auth.isAuthenticated && (
        <Header view={view} setView={setView} logout={logout} />
      )}

      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 z-50 w-80">
          <Alert type={notification.type} message={notification.message} />
        </div>
      )}

      <main className="container mx-auto p-4">
        {!auth.isAuthenticated && view === "login" && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <AuthForm
              type="login"
              onSubmit={login}
              loading={loading}
              switchFormType={() => setView("register")}
            />
          </div>
        )}

        {!auth.isAuthenticated && view === "register" && (
          <div className="flex items-center justify-center min-h-screen p-4">
            <AuthForm
              type="register"
              onSubmit={register}
              loading={loading}
              switchFormType={() => setView("login")}
            />
          </div>
        )}
        {auth.isAuthenticated && view === "gallery" && (
          <Gallery setView={setView} savedImages={savedImages} />
        )}
        {auth.isAuthenticated && view === "editor" && (
          <div className="flex flex-col lg:flex-row gap-6">
            <Toolbox
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              handleImageUpload={handleImageUpload}
              resetChanges={resetChanges}
              image={image}
              handleExport={handleExport}
              deleteImage={deleteImage}
              onSave={saveImage}
            />
            <Editor
              image={preview}
              activeTool={activeTool}
              setActiveTool={setActiveTool}
              containerRef={containerRef}
              rotateAngle={rotateAngle}
              cropParams={cropParams}
              completedCrop={completedCrop}
              setCompletedCrop={setCompletedCrop}
              setCropParams={setCropParams}
              canvasRef={canvasRef}
              handleImageUpload={handleImageUpload}
              handleRotate={handleRotate}
              applyChanges={applyChanges}
            />
            <OperationsPanel
              operations={operations}
              setOperations={setOperations}
              handleExport={handleExport}
              downloadImage={downloadImage}
              setNotification={setNotification}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
