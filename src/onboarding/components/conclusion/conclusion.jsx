import React from 'react'
import './conclusion.css';
import { Box, Card } from '@mui/material';
import { ArcherContainer, ArcherElement } from "react-archer";
import { textConstants } from '../../../textConstants'
function conclusion() {
    return (
        <div className='conclusion-heading'>
            <div className='div-font'>

            <span className='conclusion-li-heading'>Please verify the following:</span>
            <ol type='number' style={{ paddingInlineStart:'15px'}}>
                <li>{textConstants.CONCLUSION_PAGE_VERIFY_TEXT1}</li>
                <li>{textConstants.CONCLUSION_PAGE_VERIFY_TEXT2}</li>
            </ol>
            </div>

            <Box className='cardBg'>
                <span className='card-header'>Congratulations!</span> <br />
                <span className='card-subHeader'>{textConstants.CONCLUSION_PAGE_VERIFY_DESC}</span> <br />
                <ArcherContainer strokeColor='#94A3B8' className='archer-body'>
                    <ArcherElement
                        id="image1"
                        relations={[
                            {
                                targetId: 'image2',
                                targetAnchor: 'left',
                                sourceAnchor: 'right',
                                style: { startMarker: true, stroke: '#94A3B8', strokeWidth: 1, lineStyle: 'straight' }
                            }
                        ]}
                    >
                        <img src="/thrive.png" alt="Image 1" className='thrive-img'/>
                    </ArcherElement>

                    <ArcherElement id="image2">
                        <img src="/acme.png" alt="Image 2" className='acme-img' />
                    </ArcherElement>
                </ArcherContainer>
            </Box>
        </div>
    )
}

export default conclusion