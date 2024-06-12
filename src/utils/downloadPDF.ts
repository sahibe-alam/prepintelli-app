import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';

const downloadPDF = async (html_code: string, file_name: string) => {
  try {
    // Add padding to the HTML content
    const html_with_padding = `
      <html>
        <head>
          <style>
            body {
              padding: 20px; /* Adjust the padding as needed */
            }
            .logo{
            text-align: left;
            background-color: lightgray;
            padding: 8px;
            }
            .logo img{
            width: 100px;
            height: 80px;
            object-fit: contain;
            }
          </style>
        </head>
        <body>
        <div class="logo">
        <img src="https://firebasestorage.googleapis.com/v0/b/prepintelli-c45bb.appspot.com/o/Logo.png?alt=media&token=0aa7872d-3079-4516-abdf-de2cba6576ce" width="100" height="50"/>
        </div>
          ${html_code}
        </body>
      </html>
    `;

    const options = {
      html: html_with_padding,
      fileName: file_name,
      directory:
        Platform.OS === 'ios'
          ? RNFS.LibraryDirectoryPath
          : RNFS.DownloadDirectoryPath,
      base64: false,
    };

    const file = await RNHTMLtoPDF.convert(options);
    const localUrl = file.filePath;

    let destPath;
    let fileNameUnique = file_name;
    let count = 0;
    do {
      destPath = `${
        Platform.OS === 'ios'
          ? RNFS.LibraryDirectoryPath
          : RNFS.DownloadDirectoryPath
      }/${fileNameUnique}`;
      if (await RNFS.exists(destPath)) {
        count++;
        fileNameUnique = `${file_name}${count}.pdf`;
      }
    } while (await RNFS.exists(destPath));

    await RNFS.copyFile(localUrl as string, destPath);
    console.log(destPath);

    return destPath; // Resolve with the path to the generated PDF
  } catch (error) {
    console.error(error);
    throw error; // Reject with the error
  }
};

export default downloadPDF;
