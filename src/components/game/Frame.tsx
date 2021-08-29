import { PropsWithChildren } from 'react';
import './Frame.css';

// import { prefixClassName } from '../../util'


interface FrameProps {

}

export function Frame({ children }: PropsWithChildren<FrameProps>): JSX.Element {
  return (
    <div className={'Frame'}>
      {children}
    </div>
  )
}
