

const CreateProject = () => {
    


  return (
    <div>
      

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



    </div>
  )
}

export default CreateProject
