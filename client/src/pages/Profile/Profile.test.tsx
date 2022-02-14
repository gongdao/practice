import { render } from '@testing-library/react';
import Profile from './Profile';
import MockAuthProvider from '../../mocks/mockUseAuthProvider';

describe('Profile tests', () => {
  test('smoke test', () => {
    render(
      <MockAuthProvider>
        <Profile />
      </MockAuthProvider>,
    );
  });

  test('loading snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Profile />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('rendered messages snapshot test', () => {
    const { asFragment } = render(
      <MockAuthProvider>
        <Profile />
      </MockAuthProvider>,
    );
    expect(asFragment).toMatchSnapshot();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', () => {
    const { getByRole } = render(<Profile />);
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  test('should have loading when waiting for auth provide to check if loggedIn', async () => {
    const { getAllByText, getByPlaceholderText } = render(
      <MockAuthProvider>
        <Profile />
      </MockAuthProvider>,
    );
    expect(getAllByText('Profile Photo')).toHaveLength(1);
    expect(getAllByText('Upload a file from your device')).toHaveLength(1);
    expect(getAllByText('Delete photo')).toHaveLength(1);
  });
});
