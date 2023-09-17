// components
import ReportUploadForm from "../components/ReportForm";
import DropdownMenu from "../components/DropDownMenu";
import PDFViewer from "../components/PDFViewer";

const Annotation = () => {
  return (
    <>
      {/* <h1>Annotation</h1> */}
      <ReportUploadForm></ReportUploadForm>
      <DropdownMenu></DropdownMenu>
      <PDFViewer></PDFViewer>
    </>
  );
};

export default Annotation;
