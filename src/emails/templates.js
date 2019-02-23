// TODO Get client url
export default {
  confirm: id => ({
    subject: 'Roadie Confirm Email',
    html: `
      <a href='localhost:3000/confirm/${id}'>
        click to confirm email
      </a>
    `,
    text: `Copy and paste this link: localhost:3000/confirm/${id}`,
  }),
};
