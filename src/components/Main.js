import React from 'react'
import Form from './Form';

function Main() {

  return (
    <>
        <div className='container-main'>
            <div className='block-form'>
                <div className='form-header'>
                    <div className='user-avatar'></div>
                    <div className='user-content'>
                        <div className='user-name'>
                            <p>Иван Иванов</p>
                        </div>
                        <div className='user-links'>
                            <div className='link'>
                            <span className='icon'></span>
                            <a href="https://www.google.com/">Telegram</a>
                            </div>
                            <div className='link'>
                            <span className='icon'></span>
                            <a href="https://www.google.com/">Github</a>
                            </div>
                            <div className='link'>
                            <span className='icon'></span>
                            <a href="https://www.google.com/">Resume</a>
                            </div>
                        </div>
                    </div>
                </div>
                <Form/>
            </div>
        </div>
    </>
  )
}

export default Main
