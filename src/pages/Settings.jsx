import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading type="h1">بروزرسانی تنظیمات</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
