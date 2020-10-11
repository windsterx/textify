import React, { useState } from "react";
import { SuspenseWithPerf, useStorage } from "reactfire";
import { CircularProgress, Button } from "@material-ui/core";

const ImageUploadButton = (props) => {
  const [uploadTaskLoading, setUploadTaskLoading] = useState(false);
  const storage = useStorage();
  const onChange = (event) => {
    props.setUploadLoading(true);

    var itemsProcessed = 0;
    const files = event.target.files;

    for (var i = 0; i < files.length; i++) {
      setUploadTaskLoading(true);
      var fileToUpload = event.target.files[i];
      // const fileToUpload = fileList[0];
      const fileName = fileToUpload.name;
      const newRef = storage.ref("images").child(Date.now() + "-" + fileName);

      const uploadTask = newRef.put(fileToUpload);
      uploadTask.then(() => {
        console.log("upload complete");
        newRef.getDownloadURL().then((url) => {
          newRef
            .getMetadata()
            .then(function (metadata) {
              itemsProcessed++;
              props.setLogoUrl((old) => [
                ...old,
                {
                  url,
                  fileType: metadata.contentType,
                  fileName: metadata.name,
                },
              ]);

              if (itemsProcessed === files.length) {
                props.setUploadLoading(false);
                setUploadTaskLoading(false);
              }
            })
            .catch(function (error) {
              // Uh-oh, an error occurred!
            });
        });
      });
    }
  };

  return (
    <>
      <input
        style={{ display: "none" }}
        id="contained-button-file"
        multiple
        type="file"
        onChange={onChange}
        ref={props.inputRef}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="default"
          component="span"
          disabled={props.uploadLoading}
        >
          Select Files
        </Button>
      </label>
      {uploadTaskLoading ? (
        <div style={{ textAlign: "center", margin: "18px" }}>
          <CircularProgress />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

const SuspenseWrapper = ({
  logoUrl,
  setLogoUrl,
  uploadLoading,
  setUploadLoading,
  inputRef,
}) => {
  return (
    <SuspenseWithPerf fallback="loading..." traceId="storage-root">
      <ImageUploadButton
        logoUrl={logoUrl}
        setLogoUrl={setLogoUrl}
        uploadLoading={uploadLoading}
        setUploadLoading={setUploadLoading}
        inputRef={inputRef}
      />
    </SuspenseWithPerf>
  );
};

export default SuspenseWrapper;
