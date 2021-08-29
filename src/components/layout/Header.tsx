import './Header.css';
// import { prefixClassName } from '../../util'

interface HeaderProps {

}

export function Header(props: HeaderProps): JSX.Element {
  return (
    <header className={'Header'}>
      <h1>Connect Four</h1>
    </header>
  )
}
