import React from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

/**
 * VIA ALTO — ErrorBoundary Component
 * คอมโพเนนต์ดักจับข้อผิดพลาดระดับแอปพลิเคชัน (React Error Boundary)
 * ช่วยป้องกันปัญหา "หน้าจอขาว" (White Screen of Death) หากเกิดข้อผิดพลาดในการประมวลผลของ Component ใดๆ
 * พร้อมแสดงหน้าแจ้งเตือนที่สวยงามตามธีม VIA ALTO และปุ่มพากลับสู่หน้าหลักอย่างปลอดภัย
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    // กำหนด State เริ่มต้น: hasError เป็น false
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  // เมธอดดักจับเมื่อมี Error เกิดขึ้นใน Component ลูก
  static getDerivedStateFromError(error) {
    // อัปเดต State เพื่อสั่งให้แสดงหน้า Fallback UI
    return { hasError: true, error };
  }

  // เมธอดบันทึกรายละเอียดข้อผิดพลาดลงใน Console
  componentDidCatch(error, errorInfo) {
    console.error('🚨 [VIA ALTO ErrorBoundary] Caught an error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  // ฟังก์ชันรีเซ็ตและกลับสู่หน้าหลัก
  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof window !== 'undefined') {
      window.location.href = window.location.pathname;
    }
  };

  render() {
    // หากมี Error เกิดขึ้น ให้แสดงหน้า Fallback UI แทนการปล่อยให้จอขาว
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 font-sans text-charcoal">
          <div className="max-w-md w-full bg-white border border-[#E5DFD7] rounded-xl p-8 shadow-xl text-center space-y-6">
            
            {/* ไอคอนแจ้งเตือนข้อผิดพลาด */}
            <div className="w-16 h-16 rounded-full bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-inner">
              <AlertTriangle size={32} />
            </div>

            {/* หัวข้อแจ้งเตือน */}
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-[#183C32]">
                เกิดข้อผิดพลาดในการแสดงผล
              </h2>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">
                ระบบพบปัญหาบางประการในการประมวลผลหน้านี้ แต่ไม่ต้องกังวล ข้อมูลของคุณยังคงปลอดภัย
              </p>
            </div>

            {/* รายละเอียด Error ขนาดกะทัดรัด (สำหรับตรวจเช็ก) */}
            {this.state.error && (
              <div className="bg-[#F7F5F0] border border-[#EAE5DE] rounded p-3 text-left">
                <p className="text-[11px] font-mono text-stone-700 break-all">
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            {/* ปุ่มควบคุม (รีโหลด หรือ กลับหน้าหลัก) */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#FAF7F2] hover:bg-[#EAE5DE] text-[#183C32] border border-[#D5CEBF] rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                <RotateCcw size={14} />
                <span>โหลดหน้านี้ใหม่</span>
              </button>
              <button
                type="button"
                onClick={this.handleReset}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#183C32] hover:bg-[#0F2821] text-white rounded-lg text-xs font-bold transition-colors shadow-sm cursor-pointer"
              >
                <Home size={14} />
                <span>กลับสู่หน้าหลัก</span>
              </button>
            </div>

            {/* ข้อมูลแบรนด์และเพื่อการศึกษา */}
            <p className="text-[10px] text-stone-400">
              VIA ALTO Alpine Co. • เว็บไซต์เพื่อการศึกษา
            </p>

          </div>
        </div>
      );
    }

    // หากไม่มี Error ให้เรนเดอร์ Component ลูกตามปกติ
    return this.props.children;
  }
}
