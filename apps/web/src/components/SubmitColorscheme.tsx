import {graphql, useMutation} from "react-relay";
import Button from "./Button";
import Input from "./Input";
import Modal, {ModalProps} from "./Modal";
import Spinner from "./Spinner";
import {FormEvent, useState} from "react";
import Error from "@/components/Error";
import {useNavigate} from "react-router-dom";
import {SubmitColorschemeSubmitColorschemeMutation} from "./__generated__/SubmitColorschemeSubmitColorschemeMutation.graphql";

export default function SubmitColorscheme({
  active,
  onClose,
}: Omit<ModalProps, "children">) {
  const navigate = useNavigate();
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string>();

  const [commitMutation, isMutationInFlight] =
    useMutation<SubmitColorschemeSubmitColorschemeMutation>(graphql`
      mutation SubmitColorschemeSubmitColorschemeMutation(
        $owner: String!
        $name: String!
      ) {
        submit(owner: $owner, name: $name) {
          id
        }
      }
    `);

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    commitMutation({
      variables: {owner, name},
      onCompleted: (response, errors) => {
        if (errors) {
          const [firstError] = errors;
          setError(firstError.message);
        } else {
          navigate(`/${encodeURIComponent(response.submit!.id)}`);
        }
      },
    });
  }

  return (
    <Modal active={active} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="header">
          <h3 className="title">Submit a colorscheme</h3>
        </div>
        <div className="content">
          <p>Enter a GitHub repository to submit its colorscheme.</p>
          <label>
            <div className="label">Owner</div>
            <Input
              placeholder="Owner"
              required
              value={owner}
              onChange={(ev) => setOwner(ev.currentTarget.value)}
            />
          </label>
          <label>
            <div className="label">Name</div>
            <Input
              placeholder="Name"
              required
              value={name}
              onChange={(ev) => setName(ev.currentTarget.value)}
            />
          </label>
          {error && !isMutationInFlight && <Error>{error}</Error>}
        </div>
        <div className="footer">
          <Button secondary type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isMutationInFlight}
            suffix={isMutationInFlight && <Spinner />}
          >
            Submit
          </Button>
        </div>
      </form>

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
