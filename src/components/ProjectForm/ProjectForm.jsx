import  { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './ProjectForm.css';
import Card from 'react-bootstrap/Card';
import PlanningCart from '../PlanningCart/PlanningCart';
import EtudeCart from '../EtudeCart/EtudeCart';
import TechnicsCart from '../TechnicsCart/TechnicsCart';
import RegistryCart from '../RegistryCart/RegistryCart';

import SelectedProjectInfo from '../SelectedProjectInfo/SelectedProjectInfo';


import data from '../../data/Projects.json';

function ProjectForm() {
    const [selectProjectMode, setSelectProjectMode] = useState(false);

    const [selectedProject, setSelectedProject] = useState(null);


    const [projectList, setProjectList] = useState(data);
    const [showModal, setShowModal] = useState(false);

    const [projectName, setProjectName] = useState('');
    const [projectType, setProjectType] = useState('');
    const [applicationType, setApplicationType] = useState('');
    const [stageType, setStageType] = useState('');
    const [savedProject, setSavedProject] = useState(null);

    const [savedPlan, setSavedPlan] = useState(null);
    const [showPlanlamaCard, setShowPlanlamaCard] = useState(false);

    const [savedEtude, setSavedEtude] = useState(null);
    const [showEtudeCart, setShowEtudeCart] = useState(false);

    const [savedTechnics, setSavedTechnics] = useState(null);
    const [showTechnicsCart, setShowTechnicsCart] = useState(false);

    const [savedRegistry, setSavedRegistry] = useState(null);
    const [showRegistryCart, setShowRegistryCart] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };
    console.log(data)

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenPlanningCart = () => {
        setShowPlanlamaCard(true);
    };

    const handleClosePlanningCart = () => {
        setShowPlanlamaCard(false);
    };

    const handleOpenEtudeCart = () => {
        setShowEtudeCart(true);
    };

    const handleCloseEtudeCart = () => {
        setShowEtudeCart(false);
    };

    const handleOpenTechnicsCart = () => {
        setShowTechnicsCart(true);
    };

    const handleCloseTechnicsCart = () => {
        setShowTechnicsCart(false);
    };

    const handleOpenRegistryCart = () => {
        setShowRegistryCart(true);
    };

    const handleCloseRegistryCart = () => {
        setShowRegistryCart(false);
    };


    const handleSaveProject = () => {
        const newProject = {
            name: projectName,
            type: projectType,
            application: applicationType,
            stage: stageType,
            id: 3
        };
        setSavedProject(newProject);
        setProjectList([{ ...projectList, newProject }])
        console.log(projectList)
        if (stageType === 'PLANLAMA') {
            setShowPlanlamaCard(true);
        } else if (stageType === 'ETÜT/PROJE') {
            setShowEtudeCart(true);
        }

        setShowModal(false);
    };


    const handleSelectExistingProject = (project) => {
        setSelectedProject(project); // Seçilen projeyi sakla
        setSelectProjectMode(false); // Modal'ı kapat
    };

    const handleStageChange = (newStage) => {
        setSelectedProject(prevProject => ({
            ...prevProject,
            stage: newStage
        }));
    };


    
    return (
        <div className="project-page">
            <div className="transparent-overlay"></div>
            <h2>Proje İşlemleri </h2>


            {!selectedProject && (
            <div className="  d-flex justify-content-center" style={{ marginTop: '20vh' }}>
                <Card className=" newCard w-80 m-20 p-5 ">
                    <Card.Body>

                        <div className="d-flex justify-content-center">
                            <Button
                                variant="primary"
                                onClick={handleOpenModal}
                                className="m-3"
                            >
                                Yeni Proje Oluştur
                             </Button>
                            <Button
                                variant="primary"
                                onClick={() => setSelectProjectMode(!selectProjectMode)}
                                className="m-3"
                            >
                                Varolan Projelerden Seç
                            </Button>
                        </div>
                        <div>
                            {selectProjectMode && (
                                <div className="project-list-container">
                                    {/* Varolan projelerin listesi */}
                                    {projectList.map((project) => (
                                        <div key={project.id} className="project-item">
                                            <p>{project.name}</p>
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleSelectExistingProject(project)}
                                            >
                                                Seç
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            </div>


            )}
            {/* Seçilen proje bilgisini ekrana yazdır */}
            {/* Seçilen proje bilgisini görsel olarak göster */}
            {selectedProject && <SelectedProjectInfo selectedProject={selectedProject} onStageChange={handleStageChange} />}


            { /*  bütün projeleri gösterir
        
            {
                data.map((project) => {
                    return <p>{project.name}</p>
                })
            }
        */}

            {/* Yeni proje giriş modalı */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Proje Bilgilerini Gir</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="projectName">
                            <Form.Label>Proje Adı</Form.Label>
                            <Form.Control type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="projectType">
                            <Form.Label>Proje Tipi</Form.Label>
                            <Form.Control as="select" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                                <option >Seçiniz</option>
                                <option value="AT">AT</option>
                                <option value="TİGH">TİGH</option>
                                <option value="AT VE TİGH">AT ve TİGH</option>
                                <option value="DRENAJ">Drenaj</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="applicationType">
                            <Form.Label>Uygulama Şekli</Form.Label>
                            <Form.Control as="select" value={applicationType} onChange={(e) => setApplicationType(e.target.value)}>
                                <option >Seçiniz</option>
                                <option value="BAĞIMSIZ">Bağımsız</option>
                                <option value="TAMAMLAMA">Tamamlama</option>
                                <option value="SULAMA">Sulama</option>
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="stageType">
                            <Form.Label>Aşama</Form.Label>
                            <Form.Control as="select" value={stageType} onChange={(e) => setStageType(e.target.value)}>
                                <option >Seçiniz</option>
                                <option value="PLANLAMA">Planlama</option>
                                <option value="ETÜT/PROJE">Etüt Proje</option>
                                <option value="UYGULAMA (İNŞAAT)">Uygulama (İnşaat)</option>
                                <option value="TESCİL (İŞLETME)">Tescil(İşletme)</option>
                            </Form.Control>
                        </Form.Group>



                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Kapat
                    </Button>
                    <Button variant="primary" onClick={handleSaveProject}>
                        Kaydet
                    </Button>
                </Modal.Footer>

            </Modal>



            {/* Kaydedilen proje bilgilerini göster */}
            {savedProject && (
                <div>
                    <h6>Kaydedilen Yeni Proje:</h6>
                    <p>Proje Adı: {savedProject.name}</p>
                    <p>Proje Tipi: {savedProject.type}</p>
                    <p>Uygulama Şekli: {savedProject.application}</p>
                    <p>Aşama: {savedProject.stage}</p>
                </div>
            )}

            <br />

            {selectedProject && (

                <div className='card_container m-5'>


                    {(selectedProject.stage === 'PLANLAMA' || selectedProject.stage === 'ETÜT/PROJE' || selectedProject.stage === 'UYGULAMA (İNŞAAT)' || selectedProject.stage === 'TESCİL (İŞLETME)') && (
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/plan-card.png" />
                            <Card.Body>
                                <Card.Title>Ön Etüt-Planlama</Card.Title>
                                <Card.Text>
                                    İl, ilçe bilgileri giriş
                                </Card.Text>
                                <Button variant="primary" onClick={handleOpenPlanningCart}>Planlama </Button>

                            </Card.Body>
                        </Card>
                    )}

                    {(selectedProject.stage === 'ETÜT/PROJE' || selectedProject.stage === 'UYGULAMA (İNŞAAT)' || selectedProject.stage === 'TESCİL (İŞLETME)' ) && (


                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/etut-card.png" className="mt-4"/>
                            <Card.Body>
                                <Card.Title>Etüt-Proje</Card.Title>
                                <Card.Text>
                                    Birim bilgileri giriş
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenEtudeCart}>Etüt/Proje</Button>

                            </Card.Body>
                        </Card>
                    )}


                    {(selectedProject.stage === 'UYGULAMA (İNŞAAT)' || selectedProject.stage === 'TESCİL (İŞLETME)') && (

                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/tescil-card.png" className="mt-5" />
                            <Card.Body>
                                <Card.Title className="mt-5">Uygulama (İnşaat)</Card.Title>
                                <Card.Text>
                                    Uygulama (İnşaat) bilgileri
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenTechnicsCart}>Uygulama (İnşaat)</Button>

                            </Card.Body>
                        </Card>
                    )}

                    {selectedProject.stage === 'TESCİL (İŞLETME)' && (


                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="primary" src="../src/assets/uygulama-card.png" className="mt-5" />
                            <Card.Body>
                                <Card.Title className=" my-7">Tescil (İşletme)</Card.Title>
                                <Card.Text>
                                    Tescil (İşletme) bilgileri
                        </Card.Text>
                                <Button variant="primary" onClick={handleOpenRegistryCart}>Tescil (İşletme)</Button>

                            </Card.Body>
                        </Card>
                    )}

                </div>


            )}

            <PlanningCart

                show={showPlanlamaCard}
                handleClose={handleClosePlanningCart}
                handleSave={setSavedPlan}
            />


            {savedPlan && (
                <div>
                    <h6>Kaydedilen Planlama Verileri</h6>
                    <p>İl: {savedPlan.il}</p>
                   {/* <p>İlçeler: {savedPlan.ilceler.join(', ')}</p> Bu kısım object donuyor?*/ }
                    {savedPlan.ilceler.map((ilceData) => (
                        <div key={ilceData.ilce}>
                            <p>İlçe: {ilceData.ilce}</p>
                            <p>Alan Bilgisi: {ilceData.alan}</p>
                        </div>
                    ))}
                </div>
            )}


            <EtudeCart

                show={showEtudeCart}
                handleClose={handleCloseEtudeCart}
                handleSave={setSavedEtude}
            />

            {savedEtude && (
                <div>
                    <h6>Birimler</h6>
                    <p> Köy/Mahalle: {savedEtude.birim}</p>
                </div>
            )}

            <TechnicsCart

                show={showTechnicsCart}
                handleClose={handleCloseTechnicsCart}
                handleSave={setSavedTechnics}
            />

            <RegistryCart

                show={showRegistryCart}
                handleClose={handleCloseRegistryCart}
                handleSave={setSavedRegistry}
            />
        </div>
    );
}

export default ProjectForm;
