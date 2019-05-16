import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./Layout";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  form {
    flex-direction: column;
    label {
      display: grid;
      grid-template-columns: auto 1fr;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      input {
        margin: 0 8px;
        border: 1px solid black;
        padding: 4px 8px;
        border-radius: 8px;
      }
    }
    button {
      border: 1px solid black;
      padding: 4px 8px;
    }
  }
`;

const UserForm = ({ user, setUser }) => {
  const { emailAddress = "", fullName = "", phoneNumber = "" } = user;
  const [email, updateEmail] = useState(emailAddress);
  const [name, updateName] = useState(fullName);
  const [phone, updatePhone] = useState(phoneNumber);
  const [saved, setSaved] = useState(false);
  return (
    <Layout>
      <Main>
        <p>
          Lane Breach makes it easy to report bike lane blockages to San
          Francisco's 311 service; just take a picture, select a category (Uber,
          bus, etc), enter an optional description, and press SEND.
        </p>
        <h4>User Information</h4>
        <form
          onSubmit={e => {
            e.preventDefault();
            setUser({
              emailAddress: email,
              fullName: name,
              phoneNumber: phone
            });
            localStorage.setItem(user, JSON.stringify(user));
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
          }}
        >
          <label htmlFor="emailAddress">
            Email:
            <input
              name="emailAddress"
              type="email"
              autoComplete="email"
              placeholder="optional"
              onChange={e => updateEmail(e.target.value)}
              value={email}
            />
          </label>
          <label htmlFor="fullName">
            Name:
            <input
              name="fullName"
              type="text"
              autoComplete="name"
              onChange={e => updateName(e.target.value)}
              placeholder="optional"
              value={name}
            />
          </label>
          <label htmlFor="phoneNumber">
            Phone:
            <input
              name="phoneNumber"
              type="tel"
              autoComplete="tel"
              onChange={e => updatePhone(e.target.value)}
              placeholder="optional"
              value={phone}
            />
          </label>
          <button type="submit" disabled={saved}>
            {saved ? "Saved!" : "Submit"}
          </button>
        </form>
      </Main>
    </Layout>
  );
};

export default UserForm;
