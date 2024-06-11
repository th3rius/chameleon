import Button from "./Button";
import Input from "./Input";
import Modal, {ModalProps} from "./Modal";
import Spinner from "./Spinner";

export default function SubmitColorscheme({
  active,
  onClose,
}: Omit<ModalProps, "children">) {
  return (
    <Modal active={active} onClose={onClose}>
      <div className="header">
        <h3 className="title">Submit a colorscheme</h3>
      </div>
      <div className="content">
        <p>Enter a GitHub repository to submit its colorscheme.</p>
        <label>
          <div className="label">Username</div>
          <Input placeholder="Username" />
        </label>
        <label>
          <div className="label">Repository</div>
          <Input placeholder="Repository" />
        </label>
      </div>
      <div className="footer">
        <Button secondary>Cancel</Button>
        <Button disabled suffix={<Spinner />}>
          Submit
        </Button>
      </div>

      <style jsx>{`
        .header {
          padding: 16px 24px;
          display: flex;
          align-items: center;
          border-bottom: 1px solid #eaeaea;
        }

        .title {
          margin: 0;
        }

        .content {
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .label {
          color: hsla(0, 0%, 40%, 1);
          font-size: 13px;
          margin-bottom: 8px;
        }

        .footer {
          padding: 16px 24px;
          background-color: #fafafa;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </Modal>
  );
}
