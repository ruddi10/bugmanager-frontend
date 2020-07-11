import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from "js-cookie";
import http from "./services/httpservice";
export default class MyUploadAdapter {
  constructor(loader, url) {
    this.loader = loader;
    this.url = url;
  }

  // Starts the upload process.
  upload() {
    return this.loader.file.then(async (file) => {
      let data = new FormData();
      data.append("image", file);
      const { data: result } = await http.post(
        "http://127.0.0.1:8000/bugmanager/images/",
        data,
        {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-US,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
          },
        }
      );
      return { default: result.image };
    });
  }
  // Aborts the upload process.
  abort() {
    console.log("Abort");
  }
}

// Initializes the XMLHttpRequest object using the URL passed to the constructor.
//   _initRequest() {
//     const xhr = (this.xhr = new XMLHttpRequest());

//     // Note that your request may look different. It is up to you and your editor
//     // integration to choose the right communication channel. This example uses
//     // the POST request with JSON as a data structure but your configuration
//     // could be different.
//     xhr.open("POST", this.url, true);
//     xhr.responseType = "json";
//   }

//   // Initializes XMLHttpRequest listeners.
//   _initListeners(resolve, reject) {
//     const xhr = this.xhr;
//     const loader = this.loader;
//     const genericErrorText = "Couldn't upload file:" + ` ${loader.file.name}.`;

//     xhr.addEventListener("error", () => reject(genericErrorText));
//     xhr.addEventListener("abort", () => reject());
//     xhr.addEventListener("load", () => {
//       const response = xhr.response;

//       // This example assumes the XHR server's "response" object will come with
//       // an "error" which has its own "message" that can be passed to reject()
//       // in the upload promise.
//       //
//       // Your integration may handle upload errors in a different way so make sure
//       // it is done properly. The reject() function must be called when the upload fails.
//       if (!response || response.error) {
//         return reject(
//           response && response.error ? response.error.message : genericErrorText
//         );
//       }

//       // If the upload is successful, resolve the upload promise with an object containing
//       // at least the "default" URL, pointing to the image on the server.
//       // This URL will be used to display the image in the content. Learn more in the
//       // UploadAdapter#upload documentation.
//       resolve({
//         default: response.url,
//       });
//     });
//     // Upload progress when it is supported. The FileLoader has the #uploadTotal and #uploaded
//     // properties which are used e.g. to display the upload progress bar in the editor
//     // user interface.
//     if (xhr.upload) {
//       xhr.upload.addEventListener("progress", (evt) => {
//         if (evt.lengthComputable) {
//           loader.uploadTotal = evt.total;
//           loader.uploaded = evt.loaded;
//         }
//       });
//     }
//   }

//   // Prepares the data and sends the request.
//   _sendRequest() {
//     // Prepare the form data.
//     this.xhr.setRequestHeader("X-CSRFToken", Cookies.get("csrftoken"));
//     console.log(Cookies.get("csrftoken"));
//     this.xhr.setRequestHeader(
//       "Authorization",
//       "Bearer " + localStorage.getItem("access")
//     );
//     const data = new FormData();
//     data.append("image", this.loader.file);

//     // Send the request.
//     try {
//       this.xhr.send(data);
//     } catch (err) {
//       console.log(err.response);
//     }
//   }
// }

export let MyCustomUploadAdapterPlugin = (editor) => {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    // Configure the URL to the upload script in your back-end here!
    return new MyUploadAdapter(
      loader,
      "http://127.0.0.1:8000/bugmanager/images/"
    );
  };
};

// export let init = () => {
//   ClassicEditor.create(document.querySelector("#editor"), {
//     toolbar: [
//       "heading",
//       "|",
//       "alignment:left",
//       "alignment:center",
//       "alignment:right",
//       "alignment:adjust",
//       "|",
//       "bold",
//       "italic",
//       "blockQuote",
//       "link",
//       "|",
//       "bulletedList",
//       "numberedList",
//       "imageUpload",
//       "|",
//       "undo",
//       "redo",
//     ],
//     extraPlugins: [MyCustomUploadAdapterPlugin],
//   })
//     .then((editor) => {
//       console.log(editor);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };
