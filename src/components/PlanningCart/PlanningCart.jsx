import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import cities from '../../data/Cities.json';
import districts from '../../data/Districts.json';

function PlanningCart({ show, handleClose, handleSave }) {

    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistricts, setSelectedDistricts] = useState([]);
    const [filteredDistricts, setFilteredDistricts] = useState([]);
    const [districtFields, setDistrictFields] = useState({});

    useEffect(() => {
        const filtered = districts.filter(district => district.il_id === selectedCity);
        setFilteredDistricts(filtered);
        setSelectedDistricts([]);
        setDistrictFields({});
    }, [selectedCity]);

    const handleSavePlanlamaData = () => {
        const newPlan = {
            il: selectedCity,
            ilceler: selectedDistricts.map(districtId => {
                const districtInfo = districts.find(district => district.value === districtId);
                const alan = districtFields[districtId] || '';
                return {
                    ilce: districtInfo.title,
                    alan: alan,
                };
            }),
        };

        handleSave(newPlan);
        handleClose();
    };

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;
        setSelectedCity(selectedCity);
    };

    const handleDistrictChange = (event) => {
        const selectedDistrict = event.target.value;
        if (selectedDistricts.includes(selectedDistrict)) {
            setSelectedDistricts(prevDistricts => prevDistricts.filter(district => district !== selectedDistrict));
        } else {
            setSelectedDistricts(prevDistricts => [...prevDistricts, selectedDistrict]);
        }
    };

    useEffect(() => {
        const filtered = districts.filter(district => district.il_id === selectedCity);
        setFilteredDistricts(filtered);
        setSelectedDistricts([]);
        setDistrictFields({});
    }, [selectedCity]);


    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setDistrictFields(prevFields => ({
            ...prevFields,
            [name]: value,
        }));
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Planlama Verilerini Gir</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="city">
                    <Form.Label>İl</Form.Label>
                    <Form.Control
                        as="select"
                        value={selectedCity}
                        onChange={handleCityChange}
                    >
                        <option value="">Seçiniz</option>
                        {cities.map((city) => (
                            <option key={city.value} value={city.value}>
                                {city.title}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                {selectedCity && (
                    <div>
                        <Form.Group controlId="districts">
                            <Form.Label>İlçeler</Form.Label>
                            {filteredDistricts.map((district) => (
                                <Form.Check
                                    key={district.value}
                                    type="checkbox"
                                    label={district.title}
                                    value={district.value}
                                    checked={selectedDistricts.includes(district.value)}
                                    onChange={handleDistrictChange}
                                />
                            ))}
                        </Form.Group>

                        <Form.Group controlId="disabledDistricts">
                            <Form.Label>Seçilen İlçe Sayısı</Form.Label>
                            <Form.Control
                                type="number"
                                value={selectedDistricts.length}
                                disabled
                            />
                        </Form.Group>
                        {selectedDistricts.map((districtId) => (
                            <Form.Group controlId={`field_${districtId}`} key={districtId}>
                                <Form.Label>{districts.find(district => district.value === districtId).title} Alan Bilgisi</Form.Label>
                                <Form.Control
                                    type="number"
                                    name={districtId}
                                    value={districtFields[districtId] || ''}
                                    onChange={handleFieldChange}
                                />
                            </Form.Group>
                        ))}

                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Kapat
                </Button>
                <Button variant="primary" onClick={handleSavePlanlamaData}>
                    Kaydet
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PlanningCart;
