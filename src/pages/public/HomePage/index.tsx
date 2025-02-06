import {
  Button,
  Container,
  Paper,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './HomePage.module.css';
import useHomePageViewModel from './viewModel';

const HomePage = () => {
  const { form, onSubmit } = useHomePageViewModel();
  return (
    <Container size={420} my={40}>
      <Stack justify="center">
        <Title ta="center" className={classes.title}>
          Welcome back!
        </Title>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput
              label="Email"
              placeholder="you@mantine.dev"
              required
              withAsterisk
              key={form.key('email')}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Password"
              placeholder="Your password"
              required
              mt="md"
              key={form.key('password')}
              {...form.getInputProps('password')}
            />

            <Button fullWidth mt="xl" type="submit">
              Sign in
            </Button>
          </Paper>
        </form>
      </Stack>
    </Container>
  );
};

export default HomePage;
