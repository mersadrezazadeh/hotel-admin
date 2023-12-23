import UpdatePasswordForm from "../features/Authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/Authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Account() {
  return (
    <>
      <Heading type="h1">بروزرسانی حساب کاربری</Heading>

      <Row>
        <Heading type="h3">تغییر اطلاعات کاربر</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading type="h3">تغییر رمز عبور</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
Account;
