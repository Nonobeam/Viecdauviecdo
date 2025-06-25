import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, X as CloseIcon } from "lucide-react";
import React, { useState } from "react";

const TermsPopup = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-8 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">{title}</h2>
          <div className="overflow-y-auto max-h-[70vh] text-base text-gray-800 leading-relaxed space-y-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function TermsSection({ errors, agreeTerms, setAgreeTerms }) {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <>
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="terms"
            checked={agreeTerms}
            onCheckedChange={(c) => setAgreeTerms(!!c)}
            className="mt-1 border-gray-300"
          />
          <Label
            htmlFor="terms"
            className="text-sm text-gray-600 leading-relaxed"
          >
            Tôi đồng ý với{" "}
            <span
              onClick={() => setShowTerms(true)}
              className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Điều khoản dịch vụ
            </span>{" "}
            và{" "}
            <span
              onClick={() => setShowPrivacy(true)}
              className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium"
            >
              Chính sách bảo mật
            </span>
          </Label>
        </div>
        <AnimatePresence>
          {errors?.terms && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center text-red-600 text-sm ml-6"
            >
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.terms}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup Terms */}
      <TermsPopup
        isOpen={showTerms}
        onClose={() => setShowTerms(false)}
        title="Điều khoản Dịch vụ"
      >
        <>
          <strong>1. ĐIỀU KHOẢN CHUNG:</strong>
          <p>
            Bằng cách truy cập hoặc sử dụng trang web Matchlent.xyz, các dịch
            vụ, hoặc bất kỳ ứng dụng nào do Matchlent cung cấp (gọi chung là
            "Dịch vụ"), dù truy cập bằng cách nào, bạn đồng ý chịu sự ràng buộc
            của Điều Khoản Sử Dụng Dịch Vụ với Người Dùng này ("Điều Khoản Sử
            Dụng"). Dịch vụ do Matchlent sở hữu hoặc kiểm soát. Các Điều Khoản
            Sử Dụng này ảnh hưởng đến quyền và nghĩa vụ pháp lý của bạn. Nếu bạn
            không đồng ý chịu sự ràng buộc của tất cả các Điều Khoản Sử Dụng
            này, bạn không thể truy cập hay sử dụng Dịch vụ. Nếu Bạn có bất kỳ
            câu hỏi nào liên quan đến Điều Khoản Sử Dụng này, vui lòng liên hệ
            chúng tôi tại email: matchlent.hcm@gmail.com.
          </p>
          <p>
            Chúng tôi có thể cập nhật Điều Khoản Sử Dụng này bất cứ lúc nào theo
            thời gian vì các lý do pháp lý hoặc theo quy định nội bộ của
            Matchlent, hoặc để cho phép hoạt động thích hợp của trang web
            Matchlent.xyz. Matchlent sẽ thông báo tới bạn thông qua phương thức
            thông báo phù hợp do Matchlent quyết định tại từng thời điểm. Những
            thay đổi này sẽ áp dụng cho việc sử dụng trang web Matchlent.xyz.
            Sau khi chúng tôi đã thông báo đến bạn, nếu bạn không chấp nhận Điều
            Khoản Sử Dụng mới, bạn không thể tiếp tục sử dụng trang web
            Matchlent.xyz. Nếu bạn tiếp tục sử dụng trang web Matchlent.xyz kể
            từ ngày sự thay đổi có hiệu lực, việc sử dụng trang web
            Matchlent.xyz thể hiện bạn đồng ý bị ràng buộc bởi Điều Khoản Sử
            Dụng mới.
          </p>

          <strong>2. ĐỊNH NGHĨA VÀ GIẢI THÍCH:</strong>
          <p>
            1: “Cơ sở dữ liệu Matchlent.xyz” hoặc “Các cơ sở dữ liệu
            Matchlent.xyz” bao gồm tất cả các bài quảng cáo việc làm đăng trên
            các trang web Matchlent.xyz và/hoặc tất cả thông tin của Người Dùng
            và/hoặc các nhà tuyển dụng được đăng ký với Matchlent.xyz.
          </p>
          <p>
            2: “Cơ sở dữ liệu Hồ sơ Matchlent.xyz” hoặc “Các cơ sở dữ liệu Hồ
            sơ” là hồ sơ Người Dùng được khởi tạo và/hoặc được đăng tại các cơ
            sở dữ liệu Matchlent.xyz.
          </p>
          <p>
            3: “Dịch vụ Matchlent.xyz” là bất kỳ dịch vụ nào được cung cấp bởi
            Matchlent.
          </p>
          <p>
            4: “Hồ sơ cá nhân” là các thông tin, CV cá nhân được tạo bởi Người
            Dùng.
          </p>
          <p>
            5: “Văn bản” bao gồm tất cả văn bản trên mọi trang của trang web
            Matchlent.xyz, cho dù là tài liệu có xác định tác giả, các nội dung
            tìm kiếm có định hướng hay thông tin hướng dẫn.
          </p>
          <p>
            6: “Bạn” được đề cập ở đây là cách gọi ngắn gọn chỉ tới Người Dùng
            dịch vụ của Matchlent.
          </p>
          <p>
            7: “Người Dùng” đề cập đến bất kỳ cá nhân hoặc tổ chức nào sử dụng
            bất kỳ khía cạnh nào của trang web Matchlent.xyz và/hoặc các Dịch vụ
            của Matchlent.xyz.
          </p>
          <p>
            8: “Nội dung Người Dùng” là tất cả thông tin, dữ liệu, văn bản, phần
            mềm, âm nhạc, âm thanh, hình ảnh, đồ họa, video, quảng cáo, tin nhắn
            hoặc các tài liệu khác được gửi, đăng hoặc biểu thị bởi Người Dùng
            trên hoặc thông qua trang web Matchlent.xyz.
          </p>
          <strong>3. ĐĂNG KÝ VÀ XÁC THỰC NGƯỜI DÙNG:</strong>
          <p>
            Để sử dụng Dịch vụ bạn phải tạo một tài khoản theo yêu cầu của
            Matchlent, bạn cam kết rằng việc sử dụng tài khoản phải tuân thủ các
            quy định của Matchlent, đồng thời tất cả các thông tin bạn cung cấp
            cho chúng tôi là đúng, chính xác, mới nhất và đầy đủ tại thời điểm
            được yêu cầu. Mọi quyền lợi và nghĩa vụ của bạn sẽ căn cứ trên thông
            tin tài khoản bạn đã đăng ký, do đó nếu có bất kỳ thông tin sai lệch
            nào chúng tôi sẽ không chịu trách nhiệm trong trường hợp thông tin
            đó làm ảnh hưởng hoặc hạn chế quyền lợi của bạn. Nếu các thông tin,
            tài liệu do bạn cung cấp không chính xác, không đúng sự thật, không
            chuẩn mực hoặc theo đánh giá của Matchlent, có lý do để Matchlent
            nghi ngờ các tài liệu này liên quan đến hành vi trộm cắp hoặc làm
            giả, hoặc vi phạm bất kỳ quy định nào của pháp luật hiện hành, cũng
            như gây thiệt hại hoặc đe dọa gây thiệt hại đến lợi ích vật chất,
            danh tiếng hoặc chiến lược kinh doanh của Matchlent thì Matchlent có
            quyền từ chối cung cấp dịch vụ cho bạn. Tùy theo quyết định của
            Matchlent dựa trên mức độ nghiêm trọng và tính chất của vụ việc, bạn
            có thể không sử dụng được các dịch vụ thuộc trang web Matchlent
            và/hoặc một số chức năng có thể bị hạn chế trong quá trình sử dụng.
          </p>
          <strong>4. MẬT KHẨU VÀ BẢO MẬT:</strong>
          <p>
            1: Khi bạn đăng ký sử dụng trang web Matchlent.xyz bạn sẽ được yêu
            cầu khởi tạo mật khẩu. Để tránh việc gian lận, bạn phải giữ mật khẩu
            này bảo mật và không được tiết lộ hoặc chia sẻ với bất kỳ người nào.
            Nếu bạn biết hoặc nghi ngờ người khác biết mật khẩu của bạn, bạn nên
            thông báo với chúng tôi ngay lập tức bằng cách liên hệ với chúng tôi
            tại email: matchlent.hcm@gmail.com
          </p>
          <p>
            2: Quyền sở hữu tài khoản trang web Matchlent.xyz thuộc về
            Matchlent. Bạn đồng ý rằng tất cả các nội dung hiển thị trên web
            Matchlent.xyz, bao gồm nhưng không giới hạn các thông tin mà bạn
            cung cấp cho Matchlent để hiển thị trên web Matchlent.xyz, sơ yếu lý
            lịch, lịch sử truy cập, các hình ảnh, dữ liệu mà Matchlent nhận
            được, hoặc thu thập được, thiết kế, đồ họa, các video, âm thanh,
            tiếng động hiển thị hoặc các phương thức liên kết dẫn chiếu từ web
            Matchlent.xyz (nếu có). Sau khi bạn hoàn tất quá trình đăng ký tài
            khoản thì sẽ có quyền sử dụng tài khoản trên trang web Matchlent.xyz
            và không được tặng, cho mượn, cho thuê, chuyển nhượng hoặc bán tài
            khoản hoặc cho phép người khác sử dụng tài khoản theo những cách
            khác. Nếu Matchlent phát hiện hoặc có căn cứ hợp lý để tin rằng
            Người Dùng không phải là người đăng ký ban đầu của tài khoản thì
            Matchlent có quyền ngay lập tức tạm ngừng hoặc chấm dứt việc cung
            cấp dịch vụ cho tài khoản đã đăng ký và có quyền vô hiệu hóa vĩnh
            viễn tài khoản để bảo vệ tính bảo mật của tài khoản.
          </p>
          <p>
            Vì mục đích bảo mật thông tin, cũng như tính xác thực của Người
            Dùng, bạn không được thông báo cho bên thứ ba về tài khoản của mình
            hoặc cung cấp tài khoản cho bên thứ ba để sử dụng, trừ trường hợp
            theo quy định của pháp luật hoặc đã được Matchlent đồng ý. Nếu điều
            này gây ra rò rỉ quyền riêng tư hoặc tổn thất kinh tế cho Người Dùng
            khác hoặc tổn thất cho Matchlent thì bạn sẽ phải chịu hoàn toàn
            trách nhiệm bồi thường mọi thiệt hại cho Người Dùng khác và cho
            Matchlent.
          </p>
          <p>
            3: Khi bạn đăng ký sử dụng trang web Matchlent.xyz bạn sẽ được yêu
            cầu khởi tạo mật khẩu. Để tránh việc gian lận, bạn phải giữ mật khẩu
            này bảo mật và không được tiết lộ hoặc chia sẻ với bất kỳ người nào.
            Nếu bạn biết hoặc nghi ngờ người khác biết mật khẩu của bạn, bạn nên
            thông báo với chúng tôi ngay lập tức bằng cách liên hệ với chúng tôi
            tại email: matchlent.hcm@gmail.com
          </p>
          <p>
            4: Nếu Matchlent có lý do để tin rằng có khả năng có hành vi vi phạm
            bảo mật hoặc sử dụng không đúng mục đích trang web Matchlent.xyz,
            chúng tôi có thể yêu cầu bạn thay đổi mật khẩu hoặc chúng tôi có thể
            tạm dừng tài khoản của bạn nếu như bạn không phối hợp với Matchlent
            để dừng vi phạm này theo đánh giá của Matchlent.
          </p>
          <p>
            5: Nếu dữ liệu và thông tin của bạn bị rò rỉ do sử dụng tài khoản
            không đúng mục đích hoặc các lý do khác không phải do lỗi của
            Matchlent gây ra, bạn sẽ phải tự chịu mọi rủi ro hoặc hậu quả phát
            sinh liên quan và chịu trách nhiệm bồi thường hoàn toàn cho
            Matchlent trong trường hợp Matchlent có xảy ra mất mát hoặc thiệt
            hại mà Matchlent không phải chịu bất kỳ trách nhiệm pháp lý nào đối
            với các tổn thất hoặc thiệt hại xảy ra với bạn.
          </p>
          <strong>5. QUYỀN TRUY CẬP VÀ THU THẬP THÔNG TIN:</strong>
          <p>
            1: Khi sử dụng trang web Matchlent.xyz, bạn thừa nhận rằng bạn đồng
            ý cho chúng tôi có quyền thu thập các thông tin sau của bạn (bao gồm
            tất cả các thay đổi, cập nhật (nếu có):
            <ul className="list-disc pl-6 space-y-1">
              <li>
                Thông tin cá nhân: bao gồm các thông tin bạn cung cấp cho chúng
                tôi để tạo hồ sơ như tên, số điện thoại, địa chỉ email;...{" "}
              </li>
              <li>
                Thông tin chung: như các thông tin về kinh nghiệm làm việc, định
                hướng nghề nghiệp, mục tiêu công việc; trình độ năng lực; thu
                nhập;...
              </li>
            </ul>
          </p>
          <p>
            2: Bạn thừa nhận và đồng ý hoàn toàn chịu trách nhiệm về hình thức,
            nội dung và tính xác thực của bất kỳ hồ sơ hoặc tài liệu nào do bạn
            đăng tải trên trang web Matchlent.xyz bằng tài khoản của mình, đồng
            thời đồng ý hoàn toàn chịu trách nhiệm cho bất kỳ hệ quả nào phát
            sinh từ việc đăng tải này mà Matchlent sẽ không phải chịu bất kỳ
            trách nhiệm pháp lý nào đối với bất kỳ tổn thất hoặc thiệt hại nào
            phát sinh từ việc Nhà tuyển dụng cung cấp dữ liệu không chính xác
            hoặc vi phạm quyền của bên thứ ba.
          </p>
          <p>
            3: Matchlent có quyền đề xuất đến bạn dịch vụ và sản phẩm của bên
            thứ ba dựa trên các mục đích phù hợp mà bạn xác định trong khi đăng
            ký và bất kỳ lúc nào sau đó hoặc khi bạn đã đồng ý tiếp nhận, các đề
            xuất này sẽ được thực hiện bởi Matchlent hoặc các bên thứ ba.
          </p>
          <p>
            4: Matchlent được quyền tùy ý tuân theo các yêu cầu pháp lý, các yêu
            cầu từ cơ quan thi hành án hoặc yêu cầu của cơ quan quản lý (“Bên
            Thứ Ba có thẩm quyền”), thậm chí sự tuân thủ này có thể bao gồm việc
            công bố một số thông tin Người Dùng nhất định. Ngoài ra, Bên Thứ Ba
            có thẩm quyền được phép giữ lại các bản sao lưu trữ thông tin Người
            Dùng.
          </p>
          <p>
            5: Bạn hiểu và thừa nhận rằng tất cả các thông tin do bạn cung cấp,
            Thông tin cá nhân, hồ sơ và/hoặc thông tin tài khoản của bạn (bao
            gồm tất cả các thay đổi, cập nhật (nếu có), sẽ được công bố cho các
            Nhà tuyển dụng tiềm năng trên Matchlent khi được sự đồng ý của bạn.
          </p>
          <p>
            6: Matchlent tôn trọng tuyệt đối quyền bảo mật thông tin của Người
            Dùng. Nếu không muốn hồ sơ cá nhân của mình được công khai, bạn vui
            lòng tắt tính năng tìm việc & tính năng cho phép nhà tuyển dụng xem
            hồ sơ để tránh bị làm phiền.
          </p>
          <p>
            7: Bạn hiểu và thừa nhận rằng bạn không có các quyền sở hữu trong
            tài khoản của bạn và nếu bạn hủy bỏ tài khoản trên trang web
            Matchlent.xyz hoặc tài khoản của bạn bị chấm dứt, tất cả các thông
            tin tài khoản của bạn tại trang web Matchlent.xyz, bao gồm sơ yếu lý
            lịch, Thông tin cá nhân, thư xin việc, các công việc đã lưu, sẽ được
            đánh dấu là bị xóa và có thể bị xóa khỏi Cơ sở dữ liệu Matchlent và
            sẽ được gỡ bỏ từ bất kỳ khu vực chung nào trên trang web
            Matchlent.xyz. Thông tin có thể tiếp tục được hiển thị trong một
            khoảng thời gian vì các trở ngại trong khi truyền tín hiệu xóa thông
            qua các máy chủ của Matchlent.xyz hoặc do yêu cầu của các cơ quan
            chức năng liên quan.
          </p>
          <strong>6. TUYÊN BỐ VỀ QUYỀN SỞ HỮU TRÍ TUỆ:</strong>
          <p>
            1: Bạn tuyên bố và đảm bảo rằng: (i) bạn sở hữu Nội dung mà bạn đăng
            lên hoặc thông qua Dịch vụ hay nói cách khác, bạn có quyền cấp các
            quyền và giấy phép được quy định trong các Điều Khoản Sử Dụng này;
            (ii) việc đăng và sử dụng Nội dung trên hoặc thông qua Dịch vụ không
            vi phạm, chiếm đoạt hay xâm phạm các quyền của bất kỳ bên thứ ba
            nào, bao gồm nhưng không giới hạn ở quyền riêng tư, quyền công khai,
            bản quyền, nhãn hiệu thương mại và/hoặc quyền sở hữu trí tuệ khác.
            Với việc đăng nội dung trên trang web Matchlent.xyz, bạn chấp nhận
            và/hoặc cam kết rằng, chủ sở hữu của nội dung đó, hoặc là bạn, hoặc
            là bên thứ ba, đã cho Matchlent quyền và giấy phép không phải trả
            tiền bản quyền, lâu dài, không thay đổi, không loại trừ, không hạn
            chế để sử dụng, mô phỏng, thay đổi, sửa lại, công bố, dịch thuật,
            tạo các sản phẩm phái sinh, phân phối và hiển thị nội dung đó, toàn
            phần hay từng phần, khắp thế giới và/hoặc kết hợp nó với các công
            việc khác ở dạng bất kỳ, qua các phương tiện truyền thông hoặc công
            nghệ hiện tại hay sẽ phát triển sau này theo điều khoản đầy đủ của
            Quyền Sở hữu Trí tuệ bất kỳ trong nội dung đó. Bạn cũng cho phép
            Matchlent cấp giấy phép con cho bên thứ ba quyền không hạn chế để
            thực hiện bất kỳ quyền nào ở trên với nội dung đó. Bạn cũng cho phép
            Matchlent sử dụng logo, hình ảnh, thương hiệu, tên công ty cho hoạt
            động giới thiệu với cộng đồng nhằm mục đích tăng hiệu quả tuyển dụng
            và/hoặc truyền thông, giới thiệu cho các hoạt động của Matchlent;
            (iii) bạn đồng ý thanh toán tất cả tiền bản quyền tác giả, phí và
            bất kỳ khoản tiền nào khác còn nợ do Nội dung mà bạn đăng lên hoặc
            thông qua Dịch vụ; và (iv) bạn có quyền và năng lực pháp lý để tham
            gia vào các Điều Khoản Sử Dụng này trong quyền hạn của bạn.
          </p>
          <p>
            2: Dịch vụ chứa nội dung mà Matchlent sở hữu hoặc cấp phép ("Nội
            dung Matchlent"). Nội dung Matchlent được bảo vệ bởi bản quyền, nhãn
            hiệu thương mại, bằng sáng chế, bí mật thương mại và các luật khác,
            đồng thời giữa bạn và Matchlent, Matchlent sở hữu và nắm giữ tất cả
            các quyền về Dịch vụ và Nội dung Matchlent. Bạn không được xóa, thay
            đổi hoặc che giấu bất kỳ thông báo nào về bản quyền, nhãn hiệu
            thương mại, nhãn hiệu dịch vụ hay quyền sở hữu khác được kết hợp với
            hay đi kèm Nội dung Matchlent và bạn không được sao chép, sửa đổi,
            điều chỉnh, chuẩn bị các sản phẩm phái sinh dựa trên, thực hiện,
            hiển thị, xuất bản, phân phối, truyền đi, phát, bán, cấp phép hoặc
            khai thác Nội dung Matchlent.
          </p>
          <p>
            3: Logo và tên Matchlent là các nhãn hiệu thương mại của Matchlent
            và không được sao chép, giả mạo hay sử dụng toàn bộ hoặc một phần
            khi chưa có sự cho phép trước bằng văn bản của Matchlent. Ngoài ra,
            tất cả các tiêu đề trang, đồ họa tùy chỉnh, biểu tượng nút và tập
            lệnh đều là nhãn hiệu dịch vụ, nhãn hiệu thương mại và/hoặc bao bì
            thương mại của Matchlent và không được sao chép, giả mạo hay sử dụng
            toàn bộ hoặc một phần khi chưa có sự cho phép trước bằng văn bản của
            Matchlent.
          </p>
          <strong>7. TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM:</strong>
          <p>
            1: Matchlent không tuyên bố hay đảm bảo rằng dịch vụ sẽ không bị lỗi
            hay không bị gián đoạn; rằng các lỗi sẽ được khắc phục; hoặc rằng
            dịch vụ hoặc máy chủ cung cấp dịch vụ không bị nhiễm bất kỳ thành
            phần có hại nào, bao gồm nhưng không giới hạn ở vi- rút. Matchlent
            không đưa ra bất kỳ tuyên bố hay đảm bảo nào rằng thông tin (bao gồm
            mọi hướng dẫn) về dịch vụ chính xác, đầy đủ hoặc hữu ích. Bạn xác
            nhận rằng bạn tự chịu rủi ro khi sử dụng dịch vụ. Matchlent không
            đảm bảo rằng việc bạn sử dụng dịch vụ là hợp pháp trong bất kỳ khu
            vực pháp lý cụ thể nào và Matchlent từ chối đưa ra các bảo đảm đó
            một cách cụ thể. Một số khu vực pháp lý giới hạn hoặc không cho phép
            tuyên bố miễn trừ trách nhiệm về bảo đảm ngụ ý hay các bảo đảm khác,
            vì vậy tuyên bố miễn trừ trách nhiệm trên có thể không áp dụng cho
            bạn trong phạm vi luật pháp của khu vực pháp lý đó áp dụng cho bạn
            và các Điều Khoản Sử Dụng này.
          </p>
          <p>
            2: Bằng cách truy cập hay sử dụng dịch vụ, bạn tuyên bố và bảo đảm
            rằng hoạt động của mình là hợp pháp trong mọi khu vực pháp lý nơi
            bạn truy cập hay sử dụng dịch vụ.
          </p>
          <strong>8. GIỚI HẠN TRÁCH NHIỆM PHÁP LÝ:</strong>
          <p>
            Trong mọi tình huống, Matchlent sẽ không chịu trách nhiệm pháp lý
            với bạn về bất kỳ mất mát hay thiệt hại nào dưới mọi hình thức (bao
            gồm nhưng không giới hạn ở bất kỳ mất mát hay thiệt hại trực tiếp,
            gián tiếp, kinh tế, cảnh báo, đặc biệt, do trừng phạt, ngẫu nhiên
            hoặc do hậu quả nào) có liên quan trực tiếp hoặc gián tiếp đến: (a)
            dịch vụ; (b) nội dung Matchlent; (c) nội dung Người Dùng; (d) việc
            bạn sử dụng, không thể sử dụng hoặc hiệu quả của dịch vụ; (e) mọi
            hành động được thực hiện có liên quan đến việc điều tra của
            Matchlent hoặc cơ quan thực thi pháp luật về việc sử dụng dịch vụ
            của bạn hoặc bất kỳ bên nào khác; (f) bất kỳ hành động nào được thực
            hiện có liên quan đến chủ sở hữu bản quyền hoặc quyền sở hữu trí tuệ
            khác; (g) mọi lỗi hoặc thiếu sót trong hoạt động của dịch vụ; hoặc
            (h) mọi thiệt hại đối với mọi máy tính, thiết bị di động, thiết bị
            hoặc công nghệ khác của Người Dùng, bao gồm nhưng không giới hạn ở
            thiệt hại do bất kỳ hành vi vi phạm bảo mật nào hoặc do bất kỳ
            vi-rút, lỗi, giả mạo, gian lận, lỗi, thiếu sót, gián đoạn, khiếm
            khuyết, trì hoãn quá trình hoạt động hoặc truyền đi, lỗi mạng hay
            dòng máy tính, mọi sự cố kỹ thuật khác hoặc trục trặc khác, bao gồm
            nhưng không giới hạn ở thiệt hại do mất lợi nhuận, mất tín nhiệm,
            mất dữ liệu, ngừng việc, độ chính xác của kết quả hoặc lỗi hay trục
            trặc máy tính, ngay cả khi có thể dự đoán được hoặc Matchlent đã
            được thông báo hay lẽ ra phải biết về khả năng xảy ra các thiệt hại
            đó, cho dù theo hợp đồng, do sơ ý, trách nhiệm pháp lý nghiêm ngặt
            hoặc sai lầm cá nhân (bao gồm, nhưng không giới hạn ở nguyên nhân
            một phần hoặc toàn bộ do sơ ý, thiên tai, lỗi viễn thông, lấy cắp
            hay hủy hoại dịch vụ). Trong mọi trường hợp, Matchlent không chịu
            trách nhiệm pháp lý với bạn hoặc bất kỳ ai khác về mất mát, thiệt
            hại hoặc thương tích, bao gồm nhưng không giới hạn ở thương tích cá
            nhân hoặc tử vong.
          </p>
          <strong>9. CHÍNH SÁCH BẢO MẬT THÔNG TIN THANH TOÁN:</strong>
          <p>
            1. Cam kết bảo mật: Hệ thống thanh toán trên website/ app của
            Matchlent được cung cấp bởi các đối tác cổng thanh toán đã được cấp
            phép hoạt động hợp pháp tại Việt Nam (“Đối Tác Cổng Thanh Toán”).
            Theo đó, các tiêu chuẩn bảo mật thanh toán của Matchlent đảm bảo
            tuân thủ theo các tiêu chuẩn bảo mật của Đối Tác Cổng Thanh Toán.
          </p>
          <p>
            2. Quy định bảo mật: Khi Nhà tuyển dụng thanh toán bằng các dịch vụ
            thanh toán trên website/app của Matchlent (thanh toán không dùng
            tiền mặt); Matchlent sẽ thu thập những thông tin sau:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mã đơn hàng của khách hàng.</li>
            <li>Giá trị đơn hàng (số tiền mà khách hàng thanh toán).</li>
            <li>Thời điểm khách hàng thanh toán.</li>
            <li>Mã tham chiếu đến giao dịch của Đối Tác Cổng Thanh Toán.</li>
          </ul>
          <strong>10. SỰ KIỆN BẤT KHẢ KHÁNG:</strong>
          <p>
            “Sự kiện bất khả kháng” là tất cả các tình huống và sự kiện xảy ra
            một cách khách quan không thể lường trước được và không thể khắc
            phục được mặc dù đã áp dụng mọi biện pháp cần thiết và khả năng cho
            phép của Các Bên, bao gồm (nhưng không giới hạn): thiên tai, chiến
            tranh, lũ lụt, hỏa hoạn, động đất, dịch bệnh, giãn cách xã hội, thay
            đổi chính trị,…; việc đình công, phá hoại ngầm, cấm vận giao thông,
            đứt đường truyền, hệ thống bị xâm nhập bất hợp pháp,…; hay các quyết
            định của cơ quan nhà nước có thẩm quyền, làm ảnh hưởng hoặc chậm trễ
            trong việc thực hiện một phần hoặc toàn bộ các nghĩa vụ theo thỏa
            thuận của Các Bên. Sự kiện bất khả kháng có thể dẫn đến hậu quả bất
            lợi như Nhà tuyển dụng và Người Dùng không thể truy cập trang web,
            tốc độ truy cập chậm, mất dữ liệu đã lưu trữ và rò rỉ thông tin cá
            nhân của Người Dùng.
          </p>
          <p>
            Trong trường hợp bất khả kháng, Matchlent có thể tạm dừng thực hiện
            các nghĩa vụ của mình cho đến khi tác động của bất khả kháng được
            loại bỏ và sẽ không chịu trách nhiệm về việc vi phạm Điều khoản, Hợp
            đồng; tuy nhiên, Matchlent sẽ nỗ lực hết sức để khắc phục sự kiện và
            giảm thiểu tác động tiêu cực của nó.
          </p>

          <strong>11. GIẢI QUYẾT TRANH CHẤP:</strong>
          <p>
            1: Bất kỳ tranh chấp phát sinh trong quá trình sử dụng dịch vụ của
            Matchlent sẽ được giải quyết theo pháp luật hiện hành của nước Cộng
            hòa xã hội chủ nghĩa Việt Nam.
          </p>
          <p>
            2: Bất kỳ khiếu nại nào phát sinh trong quá trình sử dụng sản phẩm
            phải được gửi đến Matchlent ngay sau khi xảy ra sự kiện phát sinh
            khiếu nại:
            <p>
              Địa chỉ liên lạc: Tầng 3, Tòa FS - Gold Season, 47 Nguyễn Tuân, P.
              Thanh Xuân Trung, Q. Thanh Xuân, Hà Nội
            </p>
            <p>Điện thoại: 024 6680 5588 </p>
            <p>Email: matchlent.hcm@gmail.com </p>
          </p>
          <p>
            3: Matchlent sẽ căn cứ từng trường hợp cụ thể để có phương án giải
            quyết cho phù hợp. Khi thực hiện quyền khiếu nại, người khiếu nại có
            nghĩa vụ cung cấp các giấy tờ, bằng chứng, căn cứ có liên quan đến
            việc khiếu nại và phải chịu trách nhiệm về nội dung khiếu nại, giấy
            tờ, bằng chứng, căn cứ do mình cung cấp theo quy định pháp luật.
          </p>
          <p>
            5: Matchlent chỉ hỗ trợ, giải quyết khiếu nại, tố cáo của Người Dùng
            trong trường hợp bạn đã ghi đầy đủ, trung thực và chính xác thông
            tin khi đăng ký tài khoản.
          </p>
          <p>
            6: Người Dùng đồng ý bảo vệ, bồi hoàn và loại trừ Matchlent khỏi
            những nghĩa vụ pháp lý, tố tụng, tổn thất, chi phí bao gồm nhưng
            không giới hạn án phí, chi phí luật sư, chuyên gia tư vấn có liên
            quan đến việc giải quyết hoặc phát sinh từ sự vi phạm của Người Dùng
            trong quá trình sử dụng sản phẩm.
          </p>
          <p>
            7: Nếu tranh chấp không được giải quyết trong vòng sáu mươi (60)
            ngày kể từ ngày một Bên thông báo cho Bên còn lại bằng văn bản về
            việc phát sinh tranh chấp thì một trong các Bên có quyền đưa vụ việc
            ra giải quyết tại tòa án có thẩm quyền tại TP Hà Nội theo quy định
            của pháp luật, Bên thua kiện sẽ phải chịu toàn bộ các chi phí tố
            tụng tại tòa án.
          </p>

          <strong>12. HIỆU LỰC:</strong>
          <p>
            1: Các quy định tại Điều Khoản Sử Dụng này có thể được cập nhật,
            chỉnh sửa bất cứ lúc nào.Matchlent sẽ thông báo tới bạn thông qua
            phương thức thông báo phù hợp do Matchlent quyết định tại từng thời
            điểm.
          </p>
          <p>
            2: Trong trường hợp một hoặc một số điều Điều Khoản Sử Dụng này xung
            đột với các quy định của luật pháp và bị Tòa án tuyên là vô hiệu,
            điều khoản đó sẽ được chỉnh sửa cho phù hợp với quy định pháp luật
            hiện hành, và phần còn lại của Điều Khoản Sử Dụng này vẫn giữ nguyên
            giá trị.
          </p>
          <p>
            3: Điều Khoản Sử Dụng này có giá trị như Hợp Đồng. Người Dùng hiểu
            rằng, đây là hợp đồng điện tử, Giá trị pháp lý của hợp đồng điện tử
            không thể bị phủ nhận chỉ vì hợp đồng đó được thể hiện dưới dạng
            thông điệp dữ liệu theo Pháp Luật về Giao Dịch Điện Tử. Bằng cách
            nhấn vào nút “Tôi đồng ý”, Người Dùng hoàn toàn đồng ý và đã hiểu
            các điều khoản trong Hợp Đồng này và Hợp Đồng có hiệu lực kề từ thời
            điểm này. Nếu vi phạm các Điều khoản này, bạn đồng ý chịu hoàn toàn
            trách nhiệm và bồi thường thiệt hại (Nếu có) với Matchlent.
          </p>
        </>
      </TermsPopup>

      {/* Popup Privacy */}
      <TermsPopup
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Chính sách Bảo mật Thông Tin Người Dùng"
      >
        <>
          <strong>1. THU THẬP DỮ LIỆU CÁ NHÂN</strong>
          <p>1: Khi đăng ký Dịch vụ của Matchlent</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Khi đăng ký bất cứ Dịch vụ nào của Matchlent, bạn sẽ được yêu cầu
              cung cấp một số Dữ liệu Cá nhân nhất định để thiết lập tài khoản
              của bạn, để xác thực danh tính theo quy định của pháp luật hiện
              hành (bao gồm cả các lần cập nhật).
            </li>
            <li>
              Bất cứ Dữ liệu Cá nhân nào do Matchlent yêu cầu được đánh dấu “Bắt
              buộc”, bạn phải cung cấp và đồng ý để Matchlent xử lý thông tin
              này. Nếu bạn không đồng ý cung cấp Dữ liệu Cá nhân này và/hoặc
              không đồng ý để chúng tôi xử lý thông tin theo quy định tại Chính
              Sách Bảo Mật này, Matchlent sẽ không thể cung cấp các dịch vụ liên
              quan và việc đăng ký dịch vụ của bạn sẽ bị từ chối.
            </li>
          </ul>
          <p>2: Từ việc sử dụng các Dịch vụ của Matchlent của bạn</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Chúng tôi thu thập Dữ liệu Cá nhân trực tiếp từ bạn khi bạn chọn
              lựa tham gia vào bất kỳ Dịch vụ nào của Matchlent. Để làm rõ, “Dữ
              liệu cá nhân” là bất kỳ thông tin nào, bất kể dưới dạng ký hiệu,
              chữ viết, số liệu, hình ảnh, âm thanh hay bất kỳ định dạng nào
              khác trên môi trường điện tử, có khả năng nhận dạng hoặc liên kết
              trực tiếp/gián tiếp đến một cá nhân cụ thể. Dưới đây là các ví dụ
              về Dữ liệu Cá nhân mà Matchlent có thể thu thập trực tiếp từ bạn:
              tuổi, ngày sinh, điện thoại cố định hoặc số điện thoại di động,
              hình ảnh cá nhân, học vấn, sở thích cá nhân, kinh nghiệm làm việc,
              lịch sử truy cập, tìm việc, ứng tuyển, các thông tin khác liên
              quan đến Hồ sơ việc làm (CV) của bạn, các thông tin liên quan đến
              việc sử dụng các công cụ tính lương, bài thi trắc nghiệm
            </li>
            <li>
              Từ việc truy cập và đồng ý với các nội dung điều khoản của Chính
              Sách Bảo Mật này, bạn đã cho phép Matchlent được thu thập, xử lý
              và kiểm soát các Dữ liệu Cá nhân của bạn cho mục đích nêu tại Điều
              2 của Thỏa thuận này.
            </li>
          </ul>
          <p>3: Khi bạn truy cập các Dịch vụ của Matchlent</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Khi bạn truy cập bất cứ trang web nào thuộc hệ thống Matchlent,
              máy chủ trang web của chúng tôi sẽ tự động thu thập thông tin truy
              cập của bạn tại các trang web này, bao gồm địa chỉ IP, thời gian,
              ngày và thời lượng truy cập. Địa chỉ IP của bạn là thiết bị định
              dạng duy nhất cho máy tính của bạn hoặc các thiết bị truy cập
              khác.
            </li>
            <li>
              Matchlent có thể theo dõi quá trình truy cập của bạn tại bất cứ
              trang web nào thuộc hệ thống Matchlent, bằng cách cài đặt một
              “cookie” trong máy tính của bạn hoặc các thiết bị truy cập khác
              khi bạn đăng nhập. Cookies là các tập tin văn bản nhỏ được đặt
              trên máy tính của bạn hoặc thiết bị truy cập khác bởi các trang
              web mà bạn truy cập. Chúng được sử dụng rộng rãi để làm cho trang
              web hoạt động, hoặc hoạt động hiệu quả hơn, cũng như cung cấp
              thông tin cho chủ sở hữu của các trang web.
            </li>
            <li>
              Cookies cho phép Matchlent lưu lại các trạng thái dữ liệu của bạn
              để bạn sẽ không phải đăng nhập lại trong lần truy cập sau. Cookies
              cũng giúp Matchlent thu thập luồng dữ liệu truy cập ẩn danh để
              theo dõi xu hướng và mẫu người dùng. Matchlent có thể sử dụng
              luồng dữ liệu truy cập ẩn danh để giúp các nhà quảng cáo cung cấp
              quảng cáo nhắm tới mục tiêu tốt hơn.
            </li>
          </ul>
          <strong>2. MỤC ĐÍCH THU THẬP VÀ SỬ DỤNG</strong>
          <p>
            1: “Xử lý dữ liệu cá nhân” là bất kỳ hoạt động hoặc chuỗi hoạt động
            nào liên quan đến dữ liệu cá nhân, bao gồm nhưng không giới hạn ở
            việc thu thập, ghi lại, tổ chức, lưu trữ, chỉnh sửa, phân tích, truy
            xuất, sử dụng, tiết lộ, chia sẻ, kết hợp, hạn chế, xóa hoặc hủy dữ
            liệu.
          </p>
          <p>2: Mục đích Matchlent xử lý Dữ liệu Cá nhân của bạn như sau:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Xác định danh tính của bạn.</li>
            <li>
              Đánh giá và/hoặc xác định khả năng làm việc và mức độ tín nhiệm
              của bạn.
            </li>
            <li>
              Phân tích thông tin hồ sơ của bạn để giới thiệu gợi ý việc làm cho
              bạn dựa trên thông tin phân tích.
            </li>
            <li>
              Chia sẻ thông tin dữ liệu tìm việc và hồ sơ ứng viên của bạn cho
              nhà tuyển dụng.
            </li>
            <li>
              Cung cấp một trong các Dịch vụ của Matchlent mà bạn đã yêu cầu.
            </li>
            <li>
              Điều hành và quản lý các Dịch vụ của Matchlent đã cung cấp cho
              bạn.
            </li>
            <li>
              Liên lạc với bạn các vấn đề liên quan đến việc sử dụng Dịch vụ của
              Matchlent.
            </li>
            <li>
              Cải thiện các cơ hội thay đổi công việc của bạn hoặc sắp xếp các
              dịch vụ cụ thể cho bạn.
            </li>
            <li>
              Xác minh trình độ học vấn và nghề nghiệp của bạn bằng việc liên
              lạc trường học/cao đẳng/đại học/viện nghiên cứu/các cơ quan chuyên
              môn.
            </li>
            <li>
              Xử lý đơn yêu cầu trong quá trình sử dụng Dịch vụ của Matchlent mà
              bạn đã yêu cầu.
            </li>
            <li>
              Điều tra và giải quyết các khiếu nại hoặc thắc mắc khác mà bạn gửi
              đến Matchlent liên quan đến các Dịch vụ của Matchlent.
            </li>
            <li>
              Giám sát và cải thiện việc thực hiện các Dịch vụ của Matchlent.
            </li>
            <li>Duy trì và phát triển các Dịch vụ của Matchlent.</li>
            <li>
              Am hiểu về các nhu cầu thông tin và liên lạc của bạn để Matchlent
              nâng cao và điều chỉnh các Dịch vụ của Matchlent.
            </li>
            <li>
              Tiến hành nghiên cứu, phát triển và phân tích thống kê liên quan
              đến các Dịch vụ của Matchlent để xác định xu hướng và phát triển
              các dịch vụ mới đáp ứng sự quan tâm của bạn.
            </li>
            <li>
              Hỗ trợ Matchlent am hiểu các lựa chọn duyệt thông tin ưu tiên của
              bạn để Matchlent có thể điều chỉnh nội dung phù hợp.
            </li>
          </ul>
          <p>
            3: Việc thu thập dữ liệu nêu trên được thực hiện dựa trên các nguyên
            tắc hợp pháp, minh bạch và công bằng, đồng thời luôn tôn trọng quyền
            riêng tư của chủ thể dữ liệu. Bạn không thể giới hạn việc xử lý dữ
            liệu cá nhân của mình cho các mục đích được quy định tại Khoản 1
            trên, vì đây là mục đích bạn đã đồng ý khi sử dụng dịch vụ của
            Matchlent, đồng thời là cơ sở để Matchlent có thể cung cấp và thực
            hiện các dịch vụ theo yêu cầu của bạn. Nếu bạn không đồng ý để
            Matchlent xử lý dữ liệu cá nhân của mình cho các mục đích này, bạn
            cần chấm dứt thỏa thuận sử dụng dịch vụ của Matchlent và ngừng sử
            dụng các dịch vụ mà Matchlent cung cấp.{" "}
          </p>

          <strong>3. QUYỀN CỦA BẠN ĐỐI VỚI CƠ SỞ DỮ LIỆU</strong>
          <br />

          <p>
            1: Matchlent trao cho bạn sự chọn lựa để CV của mình trong Cơ Sở Dữ
            Liệu Hồ Sơ Matchlent. Có hai cách để thực hiện
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Bạn có thể lưu trữ hồ sơ của bạn trong Cơ Sở Dữ Liệu Hồ Sơ
              Matchlent, nhưng không cho phép hồ sơ này được tìm kiếm bởi Nhà
              tuyển dụng hoặc các Đơn vị quảng cáo hoặc các Chủ sở hữu tài khoản
              Matchlent Partner. Không cho phép hồ sơ của bạn được tìm kiếm có
              nghĩa là bạn có thể sử dụng nó để nộp đơn xin việc trực tuyến,
              nhưng Nhà tuyển dụng hoặc các Đơn vị quảng cáo hoặc các Chủ sở hữu
              tài khoản Matchlent Partner sẽ không có quyền truy cập để tìm kiếm
              thông qua cơ sở dữ liệu Cơ Sở Dữ Liệu Hồ Sơ Matchlent.
            </li>
            <li>
              Bạn có thể cho phép thông tin hồ sơ và thông tin dữ liệu tìm việc
              của bạn được tìm kiếm bởi hoặc gợi ý cho những Nhà tuyển dụng hoặc
              các Đơn vị quảng cáo hoặc các Chủ sở hữu tài khoản Matchlent
              Partner. Khi bạn lựa chọn để hồ sơ của mình được tìm kiếm hoặc gợi
              ý, toàn bộ thông tin lý lịch, Dữ liệu Cá nhân, và dữ liệu tìm việc
              của bạn sẽ hiển thị đối với các Nhà tuyển dụng hoặc các Đơn vị
              quảng cáo hoặc các Chủ sở hữu tài khoản Matchlent Partner khi họ
              lưu trữ qua Cơ Sở Dữ Liệu Hồ Sơ Matchlent.
            </li>
            <li>
              Trong trường hợp bạn đồng ý chia sẻ với Nhà tuyển dụng về thông
              tin dữ liệu tìm việc của bạn, Matchlent sẽ trở thành đơn vị trung
              gian kết nối và chia sẻ thông tin này cho Nhà tuyển dụng dựa trên
              sự đồng ý của bạn. Việc kết nối này có thể phát sinh một số khoản
              phí để duy trì hoạt động vận hành của hệ thống, đa số sẽ do Nhà
              tuyển dụng chi trả, nhưng trong một vài trường hợp sẽ yêu cầu bạn
              chi trả. Việc chấp nhận việc kết nối này được coi là chấp nhận với
              việc chi trả chi phí được đề cập trong điều khoản này.
            </li>
          </ul>
          <p>
            2: Matchlent nỗ lực hạn chế quyền truy cập vào Cơ Sở Dữ Liệu Hồ Sơ
            Matchlent mà chỉ dành cho những người đã đăng ký với các Dịch vụ của
            Matchlent, những người này có thể giữ lại một bản sao của hồ sơ của
            bạn trong các tập tin hoặc cơ sở dữ liệu riêng của họ. Tuy nhiên,
            trong mọi trường hợp, bạn là người có quyền chấp thuận hoặc từ chối
            để Nhà tuyển dụng truy cập vào Hồ Sơ của bạn.
          </p>
          <p>
            3: Matchlent sẽ thực hiện các bước hợp lý để các bên chưa được đề
            cập ở trên sẽ không đạt được quyền truy cập vào Cơ Sở Dữ Liệu Hồ Sơ
            Matchlent, khi chưa có sự đồng ý của Matchlent. Tuy nhiên, Matchlent
            không chịu trách nhiệm đối với việc lưu giữ, sử dụng hoặc tính bảo
            mật của hồ sơ của bất kỳ bên thứ ba nào.
          </p>
          <strong>4. LỰA CHỌN VÀ TRUY CẬP DỮ LIỆU CÁ NHÂN</strong>
          <br />
          <p>
            1: Bạn có thể có những quan tâm về quyền bảo mật khác nhau. Mục tiêu
            của Matchlent là làm rõ các thông tin mà chúng tôi thu thập, để bạn
            có thể có các lựa chọn ý nghĩa về cách sử dụng. Ví dụ:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Bạn có thể kiểm soát người mà bạn muốn chia sẻ Dữ liệu Cá nhân.
            </li>
            <li>
              Bạn có thể xem lại và kiểm soát việc đăng ký của bạn đối với các
              lựa chọn dịch vụ do Matchlent cung cấp khác nhau. Bạn có thể xem,
              chỉnh sửa hoặc xóa Dữ liệu Cá nhân và các mục ưa thích bất cứ lúc
              nào.
            </li>
            <li>
              Bạn có thể lựa chọn không tiếp nhận bất cứ tài liệu nào từ
              Matchlent.
            </li>
            <li>
              Bạn cũng có thể đăng ký các Dịch vụ Matchlent bổ sung bằng cách
              đăng nhập vào tài khoản của bạn trên trang chủ của chúng tôi.
            </li>
          </ul>
          <p>
            2: Bạn có thể tự xóa tài khoản của mình theo hướng dẫn tại phần
            “Hướng dẫn quản lý tài khoản” trên website Matchlent.vn; hoặc gửi
            email tới Matchlent để yêu cầu hỗ trợ
          </p>

          <strong>5. LƯU TRỮ DỮ LIỆU CÁ NHÂN</strong>
          <br />
          <p>
            Matchlent sẽ lưu trữ Dữ liệu Cá nhân của bạn trong khoảng thời gian
            cần thiết để thực hiện các mục đích xử lý đã nêu trong chính sách
            này. Trong một số trường hợp đặc biệt, dữ liệu có thể được lưu trữ
            lâu hơn nếu có yêu cầu pháp lý buộc chúng tôi phải giữ lại thông
            tin. Thời gian chúng tôi lưu giữ một số thông tin cá nhân sẽ khác
            nhau tùy theo mục đích sử dụng và chúng tôi sẽ tuân thủ luật pháp
            khi xóa thông tin cá nhân của bạn.
          </p>
          <p>
            Sau khi chấm dứt hoặc vô hiệu hóa tài khoản của bạn, nếu không nhận
            được yêu cầu xóa Dữ liệu cá nhân của bạn, Matchlent, Chi nhánh hoặc
            Nhà cung cấp dịch vụ của Matchlent có thể giữ lại thông tin (bao gồm
            thông tin trang cá nhân của bạn) và Nội dung của người dùng trong
            khoảng thời gian hợp lý về mặt thương mại cho các mục đích sao lưu,
            lưu trữ và/hoặc kiểm tra theo quy định của pháp luật Việt Nam.
          </p>

          <strong>6. BẢO MẬT DỮ LIỆU CÁ NHÂN</strong>
          <br />
          <p>
            1: Matchlent cam kết bảo mật Dữ liệu Cá nhân của bạn. Matchlent có
            quy trình kỹ thuật, hành chính và vật chất thích hợp để chống mất
            mát, trộm cắp và lạm dụng, cũng như chống lại việc truy cập trái
            phép, tiết lộ, thay đổi và tiêu hủy thông tin. Thông tin nhạy cảm
            (như là số thẻ ngân hàng, thẻ tín dụng) được nhập vào các dịch vụ
            cổng thanh toán của chúng tôi hoặc đối tác thanh toán sẽ được mã hóa
            trong quá trình truyền tải thông tin, trách nhiệm bảo mật sau cùng
            thuộc về đối tác cổng thanh toán.
          </p>
          <p>
            2: Tuy nhiên, không có phương pháp truyền tải qua Internet hoặc
            phương pháp lưu trữ điện tử nào là an toàn 100%. Do đó, chúng tôi
            không thể đảm bảo bảo mật tuyệt đối. Nếu bạn có bất kỳ câu hỏi nào
            về việc bảo mật trên Matchlent, bạn có thể liên hệ với chúng tôi qua
            email matchlent.hcm@gmail.com.
          </p>

          <strong>7. NHỮNG BÊN THỨ BA ĐƯỢC SỬ DỤNG THÔNG TIN</strong>
          <br />
          <p>
            1: “Bên thứ ba” là bất kỳ cá nhân, tổ chức, hoặc pháp nhân nào không
            phải là Matchlent hoặc chủ thể dữ liệu, có thể tiếp nhận dữ liệu cá
            nhân từ Matchlent trong các trường hợp được quy định trong chính
            sách này.
          </p>
          <p>
            2: Dữ liệu Cá nhân đề cập ở Khoản 1 trên đây có thể được công bố/sử
            dụng/xử lý bởi các bên thứ ba sau đây nhằm kết nối các Dịch vụ của
            Matchlent và bạn đến các cơ hội phù hợp:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Các Nhà tuyển dụng/Doanh nghiệp đang có nhu cầu tuyển dụng nhân
              sự.
            </li>
            <li>
              Các bên thứ ba ký hợp đồng với Matchlent để hỗ trợ thực hiện tất
              cả hoặc một phần các Dịch vụ Matchlent cho bạn, bao gồm nhưng
              không giới hạn:
              <ul className="list-disc pl-6 space-y-1">
                <li>Dịch vụ hồ sơ/đánh giá.</li>
                <li>
                  Dịch vụ nghiên cứu thị trường và phân tích sử dụng trang web.
                </li>
                <li>Cung cấp các thông tin, khóa học, sự kiện phù hợp.</li>
              </ul>
            </li>
            <li>
              Các đối tác chiến lược làm việc với Matchlent để cung cấp một
              trong các Dịch vụ của Matchlent hoặc để hỗ trợ giới thiệu tới
              người dùng Matchlent.
            </li>
            <li>
              Trường học/cao đẳng/đại học/viện nghiên cứu mà bạn đã theo học
              hoặc người giới thiệu để xác minh trình độ học vấn của bạn.
            </li>
            <li>
              Các cơ quan chuyên môn nơi bạn được công nhận trình độ chuyên môn.
            </li>
            <li>
              Các tư vấn chuyên nghiệp của Matchlent khi có nhu cầu tìm hiểu cơ
              bản với mục đích tư vấn cho Matchlent.
            </li>
            <li>
              Các công ty thuộc hệ sinh thái của Matchlent (bao gồm nhưng không
              giới hạn ở: HappyTime, TestCenter, S-Hiring).
            </li>
            <li>
              Bất cứ bên thứ ba nào sở hữu một phần hoặc toàn bộ tài sản hoặc
              hoạt động kinh doanh của Matchlent nhằm mục đích tiếp tục cung cấp
              Dịch vụ Matchlent.
            </li>
            <li>
              Các trường hợp khác được cho phép theo quy định pháp luật về bảo
              mật dữ liệu.
            </li>
          </ul>

          <p>
            3: Ngoài những trường hợp ở trên, bạn sẽ được thông báo khi Dữ liệu
            Cá nhân của bạn có thể đi đến các bên thứ ba, và bạn sẽ có cơ hội
            lựa chọn không chia sẻ thông tin này.
          </p>

          <strong>8. NGHĨA VỤ CỦA BẠN ĐỐI VỚI DỮ LIỆU CÁ NHÂN CỦA MÌNH</strong>
          <br />
          <p>
            1: Bạn có trách nhiệm cung cấp cho Matchlent các thông tin của bạn
            và cá nhân của người nào mà bạn cung cấp cho chúng tôi một cách
            chính xác, không gây nhầm lẫn, đầy đủ và gần nhất, và có trách nhiệm
            cập nhật Dữ liệu Cá nhân này khi có sự sai lệch, nhầm lẫn, không đầy
            đủ và lỗi thời bằng cách liên lạc với Matchlent qua email
            matchlent.hcm@gmail.com.
          </p>
          <p>
            2: Trong trường hợp bạn có nhu cầu cung cấp Dữ liệu Cá nhân của một
            người nào đó cho Matchlent mà không phải là thông tin của bạn (ví
            dụ, người giới thiệu hoặc người bảo lãnh), bạn nên thông báo những
            người này về việc cung cấp Dữ liệu Cá nhân của họ cho Matchlent,
            nhằm đảm bảo sự đồng ý của họ cho việc cung cấp thông tin và để họ
            biết địa chỉ để tìm Thông Báo Chính Sách này (tại mục Chính Sách Bảo
            Mật trên trang web của chúng tôi).
          </p>
          <p>
            3: Ngoài các nghĩa vụ được quy định tại Khoản 1, 2 Điều này, bạn có
            đầy đủ các nghĩa vụ của chủ thể dữ liệu theo quy định tại Điều 12
            Nghị định 13/2023/NĐ-CP.
          </p>

          <strong>
            9. HẬU QUẢ, THIỆT HẠI KHÔNG MONG MUỐN CÓ KHẢ NĂNG XẢY RA
          </strong>
          <br />
          <p>1: Mất dữ liệu vào các đối tượng mà ứng viên cho phép nhầm/lỗi</p>
          <p>
            2: Các đối tượng lừa đảo sử dụng Dữ liệu Cá nhân của bạn để thực
            hiện các mục tiêu bất hợp pháp sau khi được bạn chia sẻ.
          </p>
          <p>
            3: Matchlent có thể đánh giá và phân tích sai dữ liệu của bạn khi
            bạn không có sự cập nhật thường xuyên khi có thay đổi.
          </p>
          <p>
            4: Trong trường hợp Matchlent xác nhận xảy ra sự cố vi phạm dữ liệu
            cá nhân (chẳng hạn như rò rỉ thông tin do tấn công mạng hoặc lỗi hệ
            thống), Matchlent cam kết xử lý theo quy trình sau:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              Thông báo cho cá nhân bị ảnh hưởng thông qua email hoặc các kênh
              liên lạc khác.
            </li>
            <li>
              Cung cấp chi tiết về tính chất của vi phạm, phạm vi dữ liệu bị ảnh
              hưởng, và các biện pháp khắc phục mà chúng tôi đang thực hiện.
            </li>
            <li>
              Hướng dẫn cá nhân bị ảnh hưởng về các bước cần thực hiện để giảm
              thiểu rủi ro, chẳng hạn như thay đổi mật khẩu hoặc theo dõi tài
              khoản.
            </li>
            <li>
              Thông báo cho cơ quan có thẩm quyền theo quy định pháp luật và hợp
              tác đầy đủ để điều tra, xử lý vi phạm.
            </li>
          </ul>

          <strong>
            10. THỜI GIAN BẮT ĐẦU, THỜI GIAN KẾT THÚC XỬ LÝ DỮ LIỆU
          </strong>
          <br />
          <p>
            Từ ngày chính sách này có hiệu lực cho đến ngày Bạn (chủ sở hữu dữ
            liệu) có yêu cầu bằng văn bản về việc từ chối cho phép xử lý dữ liệu
            gửi cho Matchlent theo thông tin liên lạc bên dưới.
          </p>

          <strong>
            11. CHUYỂN DỮ LIỆU CÁ NHÂN NGOÀI PHẠM VI ĐỊA PHƯƠNG CỦA BẠN
          </strong>
          <br />
          <p>
            Matchlent có thể cần chuyển Dữ liệu Cá nhân của bạn ra ngoài phạm vi
            địa phương của bạn nếu có bất kỳ nhà cung cấp dịch vụ hoặc các đối
            tác chiến lược (“các công ty nước ngoài”) tham gia cung cấp một phần
            của một trong các Dịch vụ của Matchlent.
          </p>

          <strong>12. TRANG LIÊN KẾT</strong>
          <br />
          <p>
            1: Các trang web thuộc Matchlent có thể chứa các liên kết đến các
            trang của bên thứ ba. Matchlent không chịu trách nhiệm đối với các
            trang web của các bên thứ ba này. Bất cứ Dữ liệu Cá nhân nào của bạn
            sẵn có trên các trang đó sẽ không được hưởng lợi từ Chính Sách Bảo
            Mật này và sẽ phụ thuộc vào chính sách bảo mật của bên thứ ba liên
            quan (nếu có). Chúng tôi không chịu trách nhiệm đối với những thực
            tiễn được triển khai bởi bất kỳ trang web hoặc dịch vụ nào được liên
            kết đến hoặc từ Dịch vụ của chúng tôi, bao gồm thông tin hoặc nội
            dung có trong đó. Xin lưu ý rằng khi bạn sử dụng liên kết để đi từ
            Dịch vụ của chúng tôi đến trang web hoặc dịch vụ khác, Chính sách
            bảo mật của chúng tôi không áp dụng đối với những trang web hoặc
            dịch vụ bên thứ ba đó. Quá trình duyệt web và tương tác của bạn trên
            bất kỳ trang web hoặc dịch vụ của bên thứ ba nào, bao gồm trang web
            hoặc dịch vụ có liên kết trên trang web của chúng tôi, phải tuân
            theo các quy định và chính sách của riêng bên thứ ba đó. Ngoài ra,
            bạn đồng ý rằng chúng tôi không có trách nhiệm và không có quyền
            kiểm soát đối với bất kỳ bên thứ ba nào mà bạn cho phép truy cập vào
            Nội dung của người dùng của mình. Nếu bạn đang sử dụng trang web
            hoặc dịch vụ bên thứ ba và bạn cho phép trang web hoặc dịch vụ đó
            truy cập vào Nội dung của người dùng của mình, bạn phải tự chịu rủi
            ro khi thực hiện việc đó.
          </p>
          <p>
            2: Bạn có thể truy cập vào trang của chúng tôi bằng cách sử dụng
            dịch vụ đăng nhập như là Facebook Connect, Google, LinkedIn. Dịch vụ
            này sẽ xác thực danh tính của bạn và cung cấp cho bạn các tùy chọn
            để chia sẻ Dữ liệu Cá nhân nhất định với chúng tôi như tên và địa
            chỉ email để nhập trước vào mẫu đăng ký của chúng tôi. Các dịch vụ
            như Facebook Connect, Google, LinkedIn trong phạm vi của trang có
            thể cung cấp cho bạn các tùy chọn để đăng thông tin về các hoạt động
            của bạn trên trang web này trên trang hồ sơ cá nhân của bạn để chia
            sẻ với những người khác trong mạng lưới của bạn.
          </p>
          <p>
            3: Trang web của chúng tôi bao gồm các Tính năng Truyền thông Xã
            hội, chẳng hạn như các widget và nút like/share/comment Facebook,
            hoặc các chương trình tương tác mini chạy trên trang web của chúng
            tôi. Những tính năng này có thể thu thập địa chỉ IP của bạn, trang
            mà bạn đang truy cập trên trang web của chúng tôi, và có thể cài đặt
            cookies để kích hoạt các Tính năng hoạt động tốt. Các Tính năng
            Truyền thông Xã hội và các widget được cung cấp bởi bên thứ ba hoặc
            cung cấp trực tiếp trên trang web của chúng tôi. Sự tương tác của
            bạn với những Tính năng này được quản lý bởi chính sách bảo mật của
            bên cung cấp.
          </p>

          <strong>13. SỰ ĐỒNG Ý</strong>
          <br />
          <p>
            1: Khi sử dụng các Dịch vụ của Matchlent, bạn đồng ý với việc thu
            thập và sử dụng Dữ liệu Cá nhân của Matchlent như được mô tả ở phần
            trên (có thể thay đổi theo thời gian) trừ khi và cho đến khi bạn
            thông báo điều ngược lại với Matchlent qua email
            matchlent.hcm@gmail.com.
          </p>
          <p>
            2: Bên cạnh đó, bạn đồng ý với việc người giới thiệu, các trường
            học/cao đẳng/đại học/ học viện mà bạn đã theo học, các cơ quan
            chuyên môn nơi bạn được công nhận trình độ chuyên môn và các Nhà
            tuyển dụng công bố thông tin cá nhân của bạn với Matchlent.
          </p>

          <p>
            <strong>14. QUYỀN RIÊNG TƯ TRẺ EM</strong>
            <br />
            Matchlent không chủ định thu thập hoặc yêu cầu bất kỳ thông tin nào
            từ bất kỳ ai dưới 16 tuổi hoặc không chủ ý cho phép những người đó
            đăng ký Dịch vụ. Dịch vụ và nội dung của Dịch vụ không nhắm tới trẻ
            em dưới 16 tuổi. Trong trường hợp chúng tôi biết rằng mình đã thu
            thập Dữ liệu Cá nhân từ trẻ em dưới 16 tuổi mà không có sự chấp
            thuận của cha mẹ, chúng tôi sẽ xóa thông tin đó nhanh nhất có thể.
            Nếu bạn cho rằng chúng tôi có thể có thông tin từ hoặc về trẻ dưới
            16 tuổi, vui lòng liên hệ với chúng tôi.
          </p>
        </>
      </TermsPopup>
    </>
  );
}
