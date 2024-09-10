import sys
import objc
from Cocoa import NSApplication, NSWindow, NSButton, NSMakeRect, NSObject, NSApplicationActivationPolicyRegular

class AppDelegate(NSObject):
    def applicationDidFinishLaunching_(self, notification):
        # 윈도우 설정
        self.window = NSWindow.alloc().initWithContentRect_styleMask_backing_defer_(
            NSMakeRect(200.0, 300.0, 400.0, 200.0),  # 윈도우 위치 및 크기
            15,  # 스타일 마스크
            2,  # 백킹 스토어 타입
            0   # 딜레이 생성
        )
        self.window.setTitle_("Hello, World!")  # 윈도우 타이틀 설정
        self.window.makeKeyAndOrderFront_(None)

        # 버튼 추가
        self.button = NSButton.alloc().initWithFrame_(NSMakeRect(150.0, 80.0, 100.0, 40.0))
        self.button.setTitle_("Click Me")
        self.button.setTarget_(self)
        self.button.setAction_(objc.selector(self.buttonClicked_, signature=b'v@:@'))
        self.window.contentView().addSubview_(self.button)

    def buttonClicked_(self, sender):
        print("Button clicked!")

if __name__ == "__main__":
    app = NSApplication.sharedApplication()
    delegate = AppDelegate.alloc().init()
    app.setDelegate_(delegate)
    app.setActivationPolicy_(NSApplicationActivationPolicyRegular)
    app.activateIgnoringOtherApps_(True)
    app.run()
