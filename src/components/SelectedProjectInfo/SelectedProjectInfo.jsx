import React, { useState } from 'react';
import './SelectedProjectInfo.css';

function SelectedProjectInfo({ selectedProject, onStageChange }) {
    const [editingStage, setEditingStage] = useState(false);
    const [newStage, setNewStage] = useState(selectedProject.stage);

    const handleEditClick = () => {
        setEditingStage(true);
    };

    const handleCancelEdit = () => {
        setEditingStage(false);
        setNewStage(selectedProject.stage);
    };

    const handleSaveEdit = () => {
        onStageChange(newStage);
        setEditingStage(false);
    };

    return (
        <div className="selected-project-container">
            <div className="selected-project-info">
                <h4>Seçilen Proje</h4>
                <p>Proje Adı: {selectedProject.name}</p>
                <p>Tipi: {selectedProject.type}</p>
                <p>Uygulama Şekli: {selectedProject.application}</p>

                {editingStage ? (
                    <div className="stage-edit">
                        <select value={newStage} onChange={(e) => setNewStage(e.target.value)}>
                            <option value="PLANLAMA">Planlama</option>
                            <option value="ETÜT/PROJE">Etüt/Proje</option>
                            <option value="UYGULAMA (İNŞAAT)">Uygulama (İnşaat)</option>
                            <option value="TESCİL (İŞLETME)">Tescil(İşletme)</option>
                        </select>
                        <button className="edit-button" onClick={handleSaveEdit}>Kaydet</button>
                        <button className="edit-button" onClick={handleCancelEdit}>İptal</button>
                    </div>
                ) : (
                    <div className="stage-display">
                        <p>Aşama: {selectedProject.stage}</p>
                        <button className="edit-button" onClick={handleEditClick}>Düzenle</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default SelectedProjectInfo;
