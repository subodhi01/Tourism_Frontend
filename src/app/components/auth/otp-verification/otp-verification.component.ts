// // // import { Component, Input } from '@angular/core';
// // // import { CommonModule } from '@angular/common';
// // // import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// // // import { HttpClient } from '@angular/common/http';
// // // import { RouterModule } from '@angular/router';

// // // @Component({
// // //   selector: 'app-otp-verification',
// // //   standalone: true,
// // //   imports: [CommonModule, ReactiveFormsModule, RouterModule],
// // //   templateUrl: './otp-verification.component.html',
// // //   styleUrls: ['./otp-verification.component.scss']
// // // })
// // // export class OtpVerificationComponent {
// // //   @Input() email: string = '';
// // //   otpForm: FormGroup;
// // //   error: string = '';
// // //   loading: boolean = false;
// // //   success: boolean = false;
// // //   private apiUrl = 'https://localhost:44399/api'; // Updated API URL to match the running backend port

// // //   constructor(
// // //     private fb: FormBuilder,
// // //     private http: HttpClient
// // //   ) {
// // //     this.otpForm = this.fb.group({
// // //       otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
// // //     });
// // //   }

// // //   verifyOTP() {
// // //     if (this.otpForm.valid) {
// // //       this.loading = true;
// // //       this.error = '';

// // //       const otp = this.otpForm.get('otp')?.value;

// // //       this.http.post(`${this.apiUrl}/auth/verify-email`, {
// // //         email: this.email,
// // //         otp: otp
// // //       }, {
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Accept': 'application/json'
// // //         }
// // //       }).subscribe({
// // //         next: (response: any) => {
// // //           console.log('OTP verification successful:', response);
// // //           this.success = true;
// // //         },
// // //         error: (error) => {
// // //           console.error('OTP verification error:', error);
// // //           if (error.error) {
// // //             this.error = error.error.message || 'OTP verification failed';
// // //           } else {
// // //             this.error = 'OTP verification failed. Please try again.';
// // //           }
// // //         },
// // //         complete: () => {
// // //           this.loading = false;
// // //         }
// // //       });
// // //     } else {
// // //       this.otpForm.markAllAsTouched();
// // //     }
// // //   }

// // //   resendOTP() {
// // //     this.loading = true;
// // //     this.error = '';

// // //     this.http.post(`${this.apiUrl}/auth/resend-otp`, {
// // //       email: this.email
// // //     }, {
// // //       headers: {
// // //         'Content-Type': 'application/json',
// // //         'Accept': 'application/json'
// // //       }
// // //     }).subscribe({
// // //       next: (response: any) => {
// // //         console.log('OTP resent successfully:', response);
// // //         this.error = '';
// // //       },
// // //       error: (error) => {
// // //         console.error('Error resending OTP:', error);
// // //         if (error.error) {
// // //           this.error = error.error.message || 'Failed to resend OTP';
// // //         } else {
// // //           this.error = 'Failed to resend OTP. Please try again.';
// // //         }
// // //       },
// // //       complete: () => {
// // //         this.loading = false;
// // //       }
// // //     });
// // //   }
// // // } 
// // import { Component, Input } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// // import { RouterModule, Router } from '@angular/router';
// // import { AuthService } from '../../../services/auth.service';

// // @Component({
// //   selector: 'app-otp-verification',
// //   standalone: true,
// //   imports: [CommonModule, ReactiveFormsModule, RouterModule],
// //   templateUrl: './otp-verification.component.html',
// //   styleUrls: ['./otp-verification.component.scss']
// // })
// // export class OtpVerificationComponent {
// //   @Input() email: string = '';
// //   otpForm: FormGroup;
// //   error: string = '';
// //   loading: boolean = false;
// //   success: boolean = false;

// //   constructor(
// //     private fb: FormBuilder,
// //     private authService: AuthService,
// //     private router: Router
// //   ) {
// //     this.otpForm = this.fb.group({
// //       otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]]
// //     });
// //   }

// //   verifyOTP() {
// //     if (this.otpForm.valid) {
// //       this.loading = true;
// //       this.error = '';

// //       const otp = this.otpForm.get('otp')?.value;

// //       this.authService.verifyEmailOTP(this.email, otp).subscribe({
// //         next: (response: any) => {
// //           console.log('OTP verification successful:', response);
// //           this.success = true;
// //           setTimeout(() => {
// //             this.router.navigate(['/auth/login']);
// //           }, 2000); // Navigate to login after 2 seconds
// //         },
// //         error: (error) => {
// //           console.error('OTP verification error:', error);
// //           this.error = error.error?.message || 'OTP verification failed. Please try again.';
// //         },
// //         complete: () => {
// //           this.loading = false;
// //         }
// //       });
// //     } else {
// //       this.otpForm.markAllAsTouched();
// //     }
// //   }

// //   resendOTP() {
// //     this.loading = true;
// //     this.error = '';

// //     this.authService.resendOTP(this.email).subscribe({
// //       next: (response: any) => {
// //         console.log('OTP resent successfully:', response);
// //         this.error = '';
// //       },
// //       error: (error) => {
// //         console.error('Error resending OTP:', error);
// //         this.error = error.error?.message || 'Failed to resend OTP. Please try again.';
// //       },
// //       complete: () => {
// //         this.loading = false;
// //       }
// //     });
// //   }
// // }
// import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { RouterModule, Router } from '@angular/router';
// import { AuthService } from '../../../services/auth.service';

// @Component({
//   selector: 'app-otp-verification',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule, RouterModule],
//   templateUrl: './otp-verification.component.html',
//   styleUrls: ['./otp-verification.component.scss']
// })
// export class OtpVerificationComponent {
//   @Input() email: string = '';
//   otpForm: FormGroup;
//   error: string = '';
//   loading: boolean = false;
//   success: boolean = false;

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     this.otpForm = this.fb.group({
//       otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]]
//     });
//   }

//   verifyOTP() {
//     if (this.otpForm.valid) {
//       this.loading = true;
//       this.error = '';

//       const otp = this.otpForm.get('otp')?.value;

//       this.authService.verifyEmailOTP(this.email, otp).subscribe({
//         next: (response: any) => {
//           console.log('OTP verification successful:', response);
//           this.success = true;
//           setTimeout(() => {
//             this.router.navigate(['/auth/login']);
//           }, 2000);
//         },
//         error: (error) => {
//           console.error('OTP verification error:', error);
//           this.error = error.error?.message || 'OTP verification failed. Please try again.';
//         },
//         complete: () => {
//           this.loading = false;
//         }
//       });
//     } else {
//       this.otpForm.markAllAsTouched();
//     }
//   }

//   resendOTP() {
//     this.loading = true;
//     this.error = '';

//     this.authService.resendOTP(this.email).subscribe({
//       next: (response: any) => {
//         console.log('OTP resent successfully:', response);
//         this.error = '';
//       },
//       error: (error) => {
//         console.error('Error resending OTP:', error);
//         this.error = error.error?.message || 'Failed to resend OTP. Please try again.';
//       },
//       complete: () => {
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component, Input } from '@angular/core';
     import { CommonModule } from '@angular/common';
     import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
     import { RouterModule, Router } from '@angular/router';
     import { AuthService } from '../../../services/auth.service';

     @Component({
       selector: 'app-otp-verification',
       standalone: true,
       imports: [CommonModule, ReactiveFormsModule, RouterModule],
       templateUrl: './otp-verification.component.html',
       styleUrls: ['./otp-verification.component.scss']
     })
     export class OtpVerificationComponent {
       @Input() email: string = '';
       otpForm: FormGroup;
       error: string = '';
       loading: boolean = false;
       success: boolean = false;

       constructor(
         private fb: FormBuilder,
         private authService: AuthService,
         private router: Router
       ) {
         this.otpForm = this.fb.group({
           otp: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('^[0-9]*$')]]
         });
       }

       verifyOTP() {
         if (this.otpForm.valid) {
           this.loading = true;
           this.error = '';

           const otp = this.otpForm.get('otp')?.value;

           this.authService.verifyEmailOTP(this.email, otp).subscribe({
             next: (response: any) => {
               console.log('OTP verification successful:', response);
               this.success = true;
               setTimeout(() => {
                 this.router.navigate(['/auth/login']);
               }, 2000);
             },
             error: (error) => {
               console.error('OTP verification error:', error);
               this.error = error.error?.message || 'OTP verification failed. Please try again.';
             },
             complete: () => {
               this.loading = false;
             }
           });
         } else {
           this.otpForm.markAllAsTouched();
         }
       }

       resendOTP() {
         this.loading = true;
         this.error = '';

         this.authService.resendOTP(this.email).subscribe({
           next: (response: any) => {
             console.log('OTP resent successfully:', response);
             this.error = '';
           },
           error: (error) => {
             console.error('Error resending OTP:', error);
             this.error = error.error?.message || 'Failed to resend OTP. Please try again.';
           },
           complete: () => {
             this.loading = false;
           }
         });
       }
     }