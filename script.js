function handleUpload() {
  const fileInput = document.getElementById('fileUpload');
  const campusSelect = document.getElementById('campusSelect');
  const announcementTime = document.getElementById('announcementTime');
  const statusMessage = document.getElementById('statusMessage');
  const uploadedDataTable = document.getElementById('uploadedDataTable');

  if (fileInput.files.length === 0) {
    statusMessage.innerText = 'No file selected';
    statusMessage.classList.add('error-message');
    return;
  }

  const file = fileInput.files[0];
  const campus = campusSelect.value;
  const announcementTimeValue = announcementTime.value;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('fileName', file.name);
  formData.append('uploader', 'User');  // 你可以根據實際情況修改
  formData.append('campus', campus);
  formData.append('announcementTime', announcementTimeValue);

  fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.json())
  .then(data => {
    statusMessage.innerText = 'Upload Successful';
    statusMessage.classList.add('success-message');
    // 更新已上傳的數據
    const newRow = uploadedDataTable.insertRow();
    newRow.insertCell(0).innerText = data.fileName;
    newRow.insertCell(1).innerText = data.uploader;
    newRow.insertCell(2).innerText = new Date(data.uploadDate).toLocaleString();
    newRow.insertCell(3).innerText = data.campus;
  })
  .catch(error => {
    statusMessage.innerText = 'Upload Failed';
    statusMessage.classList.add('error-message');
    console.error('Error:', error);
  });
}
