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
  const [imageCopy, setImageCopy] = useState(null);
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
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [view, setView] = useState("login");
  const [savedImages, setSavedImages] = useState([]);
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
    guest: false,
  });
  const [size, setSize] = useState(null);
  const [ctrlParam, setCtrlParam] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });

  const host = import.meta.env.VITE_HOST_NAME;
  console.log("host name is "+host);


  useEffect(() => {
   
    console.log("ctrlParam from app : "+ctrlParam);
    
    
  }, [ctrlParam])


  const login = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: data.name, password: data.password }),
      });
      const body = await response.text();
      const jwtToken = body.split(":");
      console.log(jwtToken[1]);

      if (!response.ok) {
        throw new Error(body.error || "An error occurred");
      }

     
        setAuth({
          isAuthenticated: true,
          user: { name: data.name, email: "TestUser@gmail.com" },
          token: jwtToken[1],
        });
        setView("editor");
        setLoading(false);
      
    } catch (error) {
      // console.log(error);
      setNotification({
        type: "error",
        message: "Incorrect Username or Password",
      });
      setLoading(false);
    }
  };

  const register = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`${host}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.name,
          password: data.password,
          email: data.email,
        }),
      });

      setTimeout(() => {
        setAuth({
          isAuthenticated: false,
          user: { email: data.email, name: data.name },
          token: "jwt-token",
        });
        setView("login");
        setLoading(false);
      }, 1500);
    } catch (error) {
      setNotification({ type: "error", message: "Registration failed" });
      setLoading(false);
    }
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null, token: null, guest: false });
    setView("login");
    setImage(null);
    setSavedImages([]);
    setPreview(null);
    setRotateAngle(0);
    setCropParams({ unit: "px", x: 10, y: 10, width: 100, height: 100 });
    setActiveTool(null);
    setCompletedCrop(null);
    // setProcessedImage(null);
  };

  const guestLogin = async () => {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "guest", password: "g@455#logNCom" }),
    });
    const body = await response.text();
    const jwtToken = body.split(":");
    // console.log(jwtToken[1]);
    setAuth({
      isAuthenticated: true,
      user: { name: "Guest", email: "Guest@gmail.com" },
      token: jwtToken[1],
      guest: true,
    });
    setView("editor");
  };

  const saveImage = async () => {
    if (preview) {
      try {
        const formData = new FormData();
        const base64Data = preview;

        const parts = base64Data.split(";base64,");
        const mimeType = parts[0].split(":")[1];
        const rawBase64 = parts[1];

        //Decode Base64 to Binary
        const byteCharacters = atob(rawBase64);
        const byteNumbers = new Array(byteCharacters.length);

        //Create a Uint8Array
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);

        // Create a Blob
        const blob = new Blob([byteArray], { type: mimeType });

        // Create a File object from the Blob ( for backends expecting a file)

        const filename = `image_${Date.now()}.jpeg`;
        const imageFile = new File([blob], filename, { type: mimeType });

        // Append to FormData
        formData.append("file", imageFile, filename);

        // // For debugging
        // for (let [key, value] of formData.entries()) {
        //   console.log(`FormData Entry After Conversion: ${key}: ${value}`);
        // }
        // console.log('Converted File Object:', imageFile);

        const response = await fetch(`${host}/img/uploadImg`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        });

        setNotification({
          type: "success",
          message: "Image saved successfully!",
        });
      } catch (e) {
        setNotification({ type: "error", message: "Saving failed" });
      }
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      const fileType = file.type;
      const extension = fileType.split("/").pop();
      const size = file.size;
      const SizeInKB = size / 1024;
      const SizeInMB = size / (1024 * 1024);
      setSize(
        SizeInKB > 1000
          ? SizeInMB.toFixed(2) + " MB"
          : SizeInKB.toFixed(2) + " KB"
      );
      reader.onload = (readerEvent) => { // Access readerEvent to get result
        const imageDataUrl = readerEvent.target.result;
        // console.log(reader.result);
        setImage(reader.result);
        setImageCopy(reader.result);
        setPreview(reader.result);
      

      const img = new Image(); // Create a new Image object

        img.onload = () => { // Set its onload handler
          setOriginalDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight,
          });
          
        };
        img.src = imageDataUrl;
      };



      reader.readAsDataURL(file);
    }
    setNotification({
      type: "success",
      message: "Image uploaded successfully!",
    });
  };

  const downloadImage = async (fileformat) => {
    if (!preview) return;
      
      const formData = new  FormData();
      const base64Data = preview;
        const parts = base64Data.split(";base64,");
        const mimeType = parts[0].split(":")[1];
        const rawBase64 = parts[1];
        const byteCharacters = atob(rawBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: mimeType });
       let fileName = "Photogenic-edit";
        fileName = fileName + "." + fileformat;
        const imageFile = new File([blob], { type: mimeType });
        formData.append("file", imageFile);

    
    
    if(fileformat==="pdf"){
      try {
        const response = await fetch(`${host}/img/convertImageToPDF`,{
          method:"POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body:formData

      });
      const downloadBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(downloadBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);

      } catch (error) {
        console.log("error generated: "+error);
      }

    }
    else if(fileformat==="jpg"){
      try {
        const response=await fetch(`${host}/img/convertToJPG`,{
          method:"POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body:formData
        });
        const downloadBlob = await response.blob();
      const downloadUrl = URL.createObjectURL(downloadBlob);
      const downloadLink = document.createElement('a');
      downloadLink.href = downloadUrl;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(downloadUrl);
      } catch (error) {
        console.log("generated error : "+error);
      }
    }else{

    const downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.href = preview;
    downloadLink.click();
    }
  };

  const handleExport = (fileformat) => {
    alert(`Image exported as ${fileformat}`);
    downloadImage(fileformat);
  };

  const deleteImage = () => {
    alert(`Do you really want to delete current image ?`);
    setPreview(null);
    setImage(null);
    setCropParams({ unit: "px", x: 0, y: 0, width: 100, height: 100 });
    setActiveTool(null);
    setRotateAngle(0);
    setCtrlParam(null);
  };

  const resetChanges = () => {
    setPreview(image);
    setImageCopy(image);
    setRotateAngle(0);
    setCropParams({ unit: "px", x: 10, y: 10, width: 100, height: 100 });
    setActiveTool(null);
    setNotification({
      type: "success",
      message: "Reset to Original Image!",
    });
  };

  const handleRotate = (angle, manualInput) => {
    if (!manualInput) {
      setRotateAngle((prev) => prev + angle);
    } else {
      setRotateAngle(angle);
    }
  };

  const applyChanges = async (data) => {
    if (imageCopy) {
      setOperations((prev) => [
        ...prev,
        {
          type: activeTool,
          params:
            activeTool === "crop"
              ? cropParams
              : activeTool === "rotate"
              ? rotateAngle
              : activeTool ==="resize"
              ? "some Value"
              : ctrlParam,
        },
      ]);

      const formData = new FormData();
      const base64Data = imageCopy;
      const parts = base64Data.split(";base64,");
      const mimeType = parts[0].split(":")[1];
      const rawBase64 = parts[1];
      const byteCharacters = atob(rawBase64);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);

      const blob = new Blob([byteArray], { type: mimeType });
      // const filename = `image_${Date.now()}.jpeg`;
      const imageFile = new File([blob], { type: mimeType });

      formData.append("file", imageFile);
      if(activeTool==="crop"){
        formData.append("x", cropParams.x)
        formData.append("y", cropParams.y)
        formData.append("width", cropParams.width)
        formData.append("height", cropParams.height)
      }
      else if(activeTool==="rotate"){
        formData.append("angle", rotateAngle);
      }else if(activeTool==="resize"){
        console.log("apply changes "+ctrlParam.width);
        formData.append("width", ctrlParam.width);
        formData.append("height", ctrlParam.height);
      }else if(activeTool==="watermark"){
        formData.append("title",ctrlParam);
      }else if(activeTool==="mirror"){
        formData.append("direction",ctrlParam);
      }else if(activeTool==="compress"){
        formData.append("size",ctrlParam);
      }

        try {
        const response = await fetch(`${host}/img/${activeTool}`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          body: formData,
        });

        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.startsWith("image/")) {
          throw new Error("Response is not an image type.");
        }

        const arrayBuffer = await response.arrayBuffer();
        const binaryString = new Uint8Array(arrayBuffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        );
        const base64Image = btoa(binaryString);
        setPreview(`data:${contentType};base64,${base64Image}`);
        // console.log(preview);
        setImageCopy(preview);

        setNotification({
          type: "success",
          message: `Image ${activeTool} successful!`,
        });
        setActiveTool(null);
      } catch (error) {
        console.log(error);
        setNotification({ type: "error", message: "Something Went Wrong" });
      }
    }
  };

  const loadGallery = async () => {
    try {
      const response = await fetch(`${host}/img/listAll`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          setNotification({ type: "info", message: "No Image in Gallery !" });
        }
        return;
      }
      const body = await response.json();
      setSavedImages(body);
    } catch (error) {
      setNotification({ type: "error", message: "Server Failed" });
    }
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
        <Header
          view={view}
          setView={setView}
          logout={logout}
          auth={auth}
          loadGallery={loadGallery}
        />
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
              guestLogin={guestLogin}
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
              guestLogin={guestLogin}
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
              auth={auth}
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
              size={size}
              setSize={setSize}
              ctrlParam={ctrlParam}
              setCtrlParam={setCtrlParam}
              originalDimensions={originalDimensions}
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
