function confirmDelete() {
        Swal.fire({
            title: 'Are you sure?',
            text: "This listing will be deleted permanently!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                document.getElementById('deleteForm').submit();
            }
        });
    }

window.addEventListener('DOMContentLoaded', () => {
        if (flashSuccess) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: flashSuccess,
                confirmButtonColor: '#3085d6'
            });
        }
    
        if (flashError) {
            Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: flashError,
                confirmButtonColor: '#d33'
            });
        }
    });
    

